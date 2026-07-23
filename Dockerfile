# ---- STAGE 1: BUILD (Java + React) ----
FROM maven:3.9.8-eclipse-temurin-21 AS builder

RUN apt-get update && apt-get install -y unzip && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package -Pprod -DskipTests -B

# ---- STAGE 2: RUNTIME ----
FROM eclipse-temurin:21-jre-alpine

RUN apk add --no-cache curl

RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

RUN mkdir -p /data && chown -R appuser:appgroup /data /app

USER appuser

ENV SPRING_PROFILES_ACTIVE=prod
ENV SERVER_PORT=10000
ENV JAVA_OPTS="-Xms256m -Xmx512m"

EXPOSE 10000

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:10000/api/contact/count || exit 1

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]