# ---- STAGE 1: BUILD FRONTEND (Node 22) ----
FROM node:22-alpine AS frontend

WORKDIR /app

COPY src/main/frontend/package*.json ./
RUN npm ci

COPY src/main/frontend/ ./
RUN npm run build

# ---- STAGE 2: BUILD BACKEND (Java 21) ----
FROM maven:3.9.8-eclipse-temurin-21 AS backend

ARG CACHE_BUST=1

WORKDIR /app

COPY pom.xml .
COPY src/main/java src/main/java
COPY src/main/resources src/main/resources

COPY --from=frontend /app/dist src/main/resources/static

RUN mvn clean package -Pdev -DskipTests -B

# ---- STAGE 3: RUNTIME ----
FROM eclipse-temurin:21-jre-alpine

RUN apk add --no-cache curl

RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

WORKDIR /app

COPY --from=backend /app/target/*.jar app.jar

RUN mkdir -p /data && chown -R appuser:appgroup /data /app

USER appuser

ENV SPRING_PROFILES_ACTIVE=prod
ENV SERVER_PORT=10000
ENV JAVA_OPTS="-Xms256m -Xmx512m"

EXPOSE 10000

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:10000/api/health || exit 1

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]