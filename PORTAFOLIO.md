# Portafolio - Documentación Técnica Completa

## Resumen del Proyecto

**Nombre**: Portafolio Personal - Alejo Software
**URL**: https://alejo-software-labs.onrender.com
**Desarrollador**: Daniel Alejandro Muñoz Godoy (Alejandromg94)

### Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Frontend | React + Vite | React 19, Vite 8 |
| Backend | Spring Boot | 3.3.2 |
| Java | Eclipse Temurin | 21 |
| Base de Datos | H2 (en memoria) | - |
| Email | EmailJS | - |
| Despliegue | Render (Docker) | - |
| Control de Versiones | Git + GitHub | - |

---

## Arquitectura General

```
┌─────────────────────────────────────────────────┐
│                    USUARIO                       │
│                 (Navegador Web)                  │
└──────────────────────┬──────────────────────────┘
                       │ HTTPS
                       ▼
┌─────────────────────────────────────────────────┐
│              DOCKER (Render)                     │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │  Stage 1: Frontend (Node 22 Alpine)        │  │
│  │  - npm ci → npm run build                  │  │
│  │  - Genera /dist (HTML, CSS, JS)            │  │
│  └──────────────────┬─────────────────────────┘  │
│                     │ Copia dist a static/        │
│  ┌──────────────────▼─────────────────────────┐  │
│  │  Stage 2: Backend (Maven + Java 21)        │  │
│  │  - mvn clean package -Pprod -DskipTests    │  │
│  │  - Empaqueta JAR con frontend embebido     │  │
│  └──────────────────┬─────────────────────────┘  │
│                     │                            │
│  ┌──────────────────▼─────────────────────────┐  │
│  │  Stage 3: Runtime (Alpine JRE 21)          │  │
│  │  - java -jar app.jar                       │  │
│  │  - Sirve frontend Y backend en puerto 10000│  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │  Frontend → EmailJS (envío directo)        │  │
│  │  Backend  → H2 Database (mensajes)         │  │
│  └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

---

## FASE 1: Configuración del Proyecto

### 1.1 Estructura de Directorios

```
hoja-de-vida-react/
├── Dockerfile                    # Build multi-etapa Docker
├── render.yaml                   # Configuración de Render
├── pom.xml                       # Maven (backend Java)
├── package.json                  # Configuración npm (frontend React)
├── src/
│   └── main/
│       ├── java/com/alejosoftware/cv/
│       │   ├── CvApplication.java              # Punto de entrada Spring Boot
│       │   ├── config/
│       │   │   └── CorsConfig.java             # Configuración CORS
│       │   ├── controller/
│       │   │   ├── ContactController.java      # API REST de contactos
│       │   │   ├── HealthController.java       # Endpoint de salud
│       │   │   ├── GlobalExceptionHandler.java # Manejo global de errores
│       │   │   └── DebugController.java        # Endpoints de diagnóstico
│       │   ├── dto/
│       │   │   ├── ContactRequest.java         # DTO de entrada
│       │   │   └── ContactResponse.java        # DTO de salida
│       │   ├── model/
│       │   │   └── ContactMessage.java         # Entidad JPA
│       │   ├── repository/
│       │   │   └── ContactMessageRepository.java  # Repositorio Spring Data
│       │   └── service/
│       │       ├── ContactService.java         # Lógica de negocio
│       │       └── EmailNotificationService.java  # Envío de email
│       ├── resources/
│       │   └── application.properties          # Configuración Spring Boot
│       └── frontend/
│           ├── package.json
│           ├── vite.config.js
│           └── src/
│               ├── App.jsx
│               ├── components/
│               │   ├── Contact.jsx             # Formulario de contacto
│               │   ├── Hero.jsx
│               │   ├── Navbar.jsx
│               │   └── ...
│               └── ...
```

### 1.2 Backend - Spring Boot

#### Punto de Entrada: `CvApplication.java`

```java
@SpringBootApplication
@EnableAsync  // Habilita ejecución asíncrona de métodos
public class CvApplication {
    public static void main(String[] args) {
        SpringApplication.run(CvApplication.class, args);
    }
}
```

**`@EnableAsync`** es necesario para que los métodos anotados con `@Async` se ejecuten en un hilo separado, permitiendo que la respuesta HTTP se devuelva inmediatamente mientras el email se envía en segundo plano.

#### Configuración: `application.properties`

```properties
# Puerto del servidor (Render requiere 10000)
server.port=8080  # Render sobreescribe con SERVER_PORT=10000

# Base de datos H2 en memoria
spring.datasource.url=jdbc:h2:mem:cvdb
spring.jpa.hibernate.ddl-auto=update

# Email via EmailJS (desde frontend)
resend.api-key=${RESEND_API_KEY:}
app.mail.to=${MAIL_TO:alejosoftwarelabs@gmail.com}

# CORS
app.cors.allowed-origins=${CORS_ALLOWED_ORIGINS:*}

# Errores visibles
server.error.include-message=always

# Logging detallado
logging.level.com.alejosoftware.cv=DEBUG
```

---

## FASE 2: Backend - API REST

### 2.1 Modelo de Datos: `ContactMessage.java`

```java
@Entity
@Table(name = "contact_messages")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContactMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 150)
    private String email;

    @Column(nullable = false, length = 200)
    private String subject;

    @Column(nullable = false, length = 5000)
    private String message;

    @Column(nullable = false)
    private boolean emailSent;

    @Column(nullable = false)
    private LocalDateTime receivedAt;
}
```

**Conceptos clave**:
- `@Entity`: Marca la clase como tabla en la base de datos
- `@GeneratedValue(strategy = IDENTITY)`: Auto-incremento del ID
- `@Column(nullable = false)`: Restricción de NOT NULL
- `@Data` (Lombok): Genera getters, setters, toString automáticamente
- `@Builder`: Permite crear objetos con patrón Builder

### 2.2 DTOs (Data Transfer Objects)

**ContactRequest.java** - Lo que recibe del frontend:
```java
@Data
public class ContactRequest {
    @NotBlank(message = "El nombre es requerido")
    @Size(max = 100)
    private String name;

    @NotBlank(message = "El email es requerido")
    @Email(message = "Email no válido")
    @Size(max = 150)
    private String email;

    @NotBlank(message = "El asunto es requerido")
    @Size(max = 200)
    private String subject;

    @NotBlank(message = "El mensaje es requerido")
    @Size(max = 5000)
    private String message;
}
```

**ContactResponse.java** - Lo que devuelve al frontend:
```java
@Data
@Builder
public class ContactResponse {
    private boolean ok;
    private boolean saved;
    private boolean emailSent;
    private String error;
    private Long messageId;
    private LocalDateTime receivedAt;
}
```

**¿Por qué usar DTOs?** Separan la entidad de la base de datos del contrato que se expone al cliente. Nunca debes enviar la entidad JPA directamente al frontend.

### 2.3 Repositorio: `ContactMessageRepository.java`

```java
@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
    List<ContactMessage> findAllByOrderByReceivedAtDesc();
}
```

**Spring Data JPA** genera automáticamente la implementación. `findAllByOrderByReceivedAtDesc()` crea un `SELECT * FROM contact_messages ORDER BY received_at DESC` sin escribir SQL.

### 2.4 Servicio: `ContactService.java`

```java
@Service
@Slf4j
public class ContactService {
    private final ContactMessageRepository messageRepository;
    private final EmailNotificationService emailNotificationService;

    // Inyección de dependencias por constructor (la forma recomendada)
    public ContactService(ContactMessageRepository messageRepository,
                          EmailNotificationService emailNotificationService) {
        this.messageRepository = messageRepository;
        this.emailNotificationService = emailNotificationService;
    }

    @Transactional
    public ContactResponse saveMessage(ContactRequest request) {
        // 1. Crear entidad desde el DTO
        ContactMessage message = ContactMessage.builder()
                .name(request.getName())
                .email(request.getEmail())
                .subject(request.getSubject())
                .message(request.getMessage())
                .build();

        // 2. Guardar en base de datos
        message = messageRepository.save(message);

        // 3. Enviar email de forma asíncrona
        emailNotificationService.sendContactEmail(message, messageRepository);

        // 4. Devolver respuesta inmediata
        return ContactResponse.builder()
                .ok(true)
                .saved(true)
                .emailSent(false)
                .messageId(message.getId())
                .receivedAt(message.getReceivedAt())
                .build();
    }
}
```

**Conceptos clave**:
- `@Transactional`: Si algo falla, se deshace la escritura en BD
- **Patrón Builder**: Permite construir objetos con muchos campos de forma legible
- El email se envía después de guardar, no bloquea la respuesta

### 2.5 Controlador: `ContactController.java`

```java
@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<ContactResponse> submitContact(
            @Valid @RequestBody ContactRequest request) {
        ContactResponse response = contactService.saveMessage(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<ContactMessage>> getAllMessages() {
        return ResponseEntity.ok(contactService.getAllMessages());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ContactResponse> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return ResponseEntity.badRequest().body(
            ContactResponse.builder()
                .ok(false)
                .saved(false)
                .emailSent(false)
                .error(errors.toString())
                .build()
        );
    }
}
```

**Conceptos clave**:
- `@RestController`: Combina `@Controller` + `@ResponseBody` (devuelve JSON)
- `@Valid`: Valida el DTO automáticamente usando las anotaciones de Bean Validation
- `@RequestBody`: Convierte el JSON del request a un objeto Java
- `@ExceptionHandler`: Captura errores de validación y devuelve respuesta amigable

### 2.6 Configuración CORS: `CorsConfig.java`

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginsPatterns("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(false)
                .maxAge(3600);
    }
}
```

**¿Qué es CORS?** (Cross-Origin Resource Sharing) — Restringe qué dominios pueden hacer peticiones a tu API. `allowedOriginsPatterns("*")` permite cualquier origen.

**Problema resuelto**: Usar `allowedOrigins("*")` junto con `@CrossOrigin(origins = "*")` en el controlador causaba un conflicto de 500. Se eliminó `@CrossOrigin` del controlador.

### 2.7 Manejo de Errores: `GlobalExceptionHandler.java`

```java
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ContactResponse> handleAllExceptions(Exception ex) {
        log.error("Unexpected error: ", ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ContactResponse.builder()
                        .ok(false)
                        .error(ex.getMessage())
                        .build());
    }
}
```

`@RestControllerAdvice` captura cualquier excepción no manejada y devuelve un JSON con el error en vez de una página de error HTML.

---

## FASE 3: Frontend - React + Vite

### 3.1 Formulario de Contacto: `Contact.jsx`

#### Estados del Componente

```jsx
const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
});
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitSuccess, setSubmitSuccess] = useState(false);
const [errors, setErrors] = useState({});
```

**Concepto**: `useState` es un Hook de React que permite agregar estado a componentes funcionales. Cada vez que cambia, React re-renderiza el componente.

#### Validación del Formulario

```jsx
const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "El nombre es requerido.";
    if (!formData.email.trim()) {
        tempErrors.email = "El correo es requerido.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        tempErrors.email = "El correo no es válido.";
    }
    if (!formData.subject.trim()) tempErrors.subject = "El asunto es requerido.";
    if (!formData.message.trim()) tempErrors.message = "El mensaje es requerido.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
};
```

Se valida tanto en el frontend (UX) como en el backend (seguridad). Nunca confíes solo en la validación del cliente.

#### Envío del Formulario con EmailJS

```jsx
import emailjs from "@emailjs/browser";

const handleSubmit = async (e) => {
    e.preventDefault();  // Previene recarga de página
    if (!validate()) return;

    setIsSubmitting(true);
    let savedToDb = false;

    // 1. Guardar en base de datos (backend)
    try {
        await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        savedToDb = true;
    } catch {
        // Continuar aunque falle la BD
    }

    // 2. Enviar email (EmailJS desde el navegador)
    try {
        await emailjs.send(
            "service_apeyqkc",      // Service ID
            "template_1txr2jd",     // Template ID
            {
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message,
            },
            "32cHoh6lAn6OMgNP7"     // Public Key
        );
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err) {
        // Si la BD guardó pero email falló, aún mostrar éxito
        if (savedToDb) {
            setSubmitSuccess(true);
            setFormData({ name: "", email: "", subject: "", message: "" });
            setTimeout(() => setSubmitSuccess(false), 5000);
        } else {
            setErrors({ message: "No se pudo enviar el mensaje." });
        }
    } finally {
        setIsSubmitting(false);
    }
};
```

**Flujo**:
1. El usuario llena el formulario
2. Se valida en el navegador
3. Se envía al backend (se guarda en H2)
4. Se envía email directamente a Gmail vía EmailJS
5. Si el email falla pero la BD guardó, aún muestra éxito

---

## FASE 4: Email - Soluciones Intentadas

Este fue el problema más complejo del proyecto. Se intentaron múltiples soluciones:

### Intento 1: SMTP Directo (Gmail)

```properties
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=${SMTP_USER:}
spring.mail.password=${SMTP_PASS:}
```

**Resultado**: `SocketTimeoutException: Connect timed out` — Render bloquea puertos SMTP (587 y 465) en su tier free.

### Intento 2: Web3Forms (API HTTP)

```java
// POST a https://api.web3forms.com/submit
body.put("access_key", accessKey);
```

**Resultado**: `403 Forbidden` — Web3Forms requiere plan Pro para uso desde servidor.

### Intento 3: FormSubmit.co (API HTTP)

```java
// POST a https://formsubmit.co/ajax/alejosoftwarelabs@gmail.com
```

**Resultado**: `403 Forbidden` — Cloudflare bloquea requests desde servidores.

### Intento 4: Resend (API HTTP)

```java
// POST a https://api.resend.com/emails
headers.setBearerAuth(apiKey);
```

**Resultado**: API devolvió 200 con ID, pero emails no llegaban. El dominio de prueba `onboarding@resend.dev` tiene restricciones de entrega.

### Solución Final: EmailJS (Frontend)

```javascript
await emailjs.send(
    "service_apeyqkc",
    "template_1txr2jd",
    { from_name, from_email, subject, message },
    "32cHoh6lAn6OMgNP7"
);
```

**Resultado**: Email llega directamente a Gmail. EmailJS funciona desde el navegador (client-side) y envía a través de Gmail conectado.

**Lección**: Los servicios de email free suelen bloquear envíos desde servidores cloud. La solución es enviar desde el navegador del usuario.

---

## FASE 5: Despliegue con Docker

### 5.1 Dockerfile Multi-Etapa

```dockerfile
# ============================================
# ETAPA 1: Compilar el Frontend (React)
# ============================================
FROM node:22-alpine AS frontend
WORKDIR /app
COPY src/main/frontend/package*.json ./
RUN npm ci                    # Instala dependencias exactas
COPY src/main/frontend/ ./
RUN npm run build             # Genera /dist

# ============================================
# ETAPA 2: Compilar el Backend (Java + Maven)
# ============================================
FROM maven:3.9.8-eclipse-temurin-21 AS backend
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B   # Descarga dependencias
COPY src/main/java src/main/java
COPY --from=frontend /app/dist src/main/resources/static
COPY src/main/resources src/main/resources
RUN mvn clean package -Pprod -DskipTests -B

# ============================================
# ETAPA 3: Runtime (solo JRE, imagen mínima)
# ============================================
FROM eclipse-temurin:21-jre-alpine AS runtime
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup
RUN apk add --no-cache curl
WORKDIR /app
COPY --from=backend /app/target/*.jar app.jar
RUN mkdir -p /data && chown -R appuser:appgroup /data /app
USER appuser
EXPOSE 10000
HEALTHCHECK --interval=30s --timeout=5s \
    CMD curl -f http://localhost:10000/api/health || exit 1
CMD ["java", "-jar", "app.jar"]
```

**¿Por qué multi-etapa?**
- Etapa 1: Solo necesita Node.js (~200MB)
- Etapa 2: Solo necesita Maven (~400MB)
- Etapa 3: Solo necesita JRE (~150MB)
- **Imagen final**: ~150MB en vez de ~750MB

**¿Por qué copiar el frontend al backend?**
`COPY --from=frontend /app/dist src/main/resources/static` — Spring Boot sirve archivos estáticos desde `/static`. Así un solo JAR sirve tanto el frontend como el backend.

### 5.2 Configuración de Render: `render.yaml`

```yaml
services:
  - type: web
    name: hoja-de-vida-backend
    runtime: java
    plan: free
    buildCommand: "./mvnw clean package -Pprod -DskipTests"
    startCommand: "java -jar target/hoja-de-vida-backend-1.0.0.jar"
    healthCheckPath: "/api/health"
    envVars:
      - key: SERVER_PORT
        value: "10000"          # Render requiere este puerto
      - key: SPRING_PROFILES_ACTIVE
        value: "prod"
```

---

## FASE 6: Problemas Resueltos

### 6.1 Error 500 en POST /api/contact

**Causa**: `@CrossOrigin(origins = "*")` en el controlador conflictaba con `allowedOriginPatterns("*")` en CorsConfig.

**Solución**: Eliminar `@CrossOrigin` del controlador, mantener solo CorsConfig.

### 6.2 Puerto Incorrecto en Render

**Causa**: La env var `SMTP_PORT=587` estaba configurada en Render, y Spring Boot la interpretaba como el puerto del servidor.

**Solución**: Hardcodear `spring.mail.port=587` en application.properties y eliminar `SMTP_PORT` de Render.

### 6.3 Email No Enviado

**Causa**: El método `@Async` estaba en la misma clase que lo llamaba (self-invocation), así que Spring no creaba el proxy AOP y se ejecutaba síncrono.

**Solución**: Extraer la lógica de email a un `@Service` separado (`EmailNotificationService`).

### 6.4 Build Cache en Docker

**Causa**: Docker cacheaba la etapa del frontend y no veía cambios en el código Java.

**Solución**: La estructura multi-etapa con COPY de archivos específicos fuerza la invalidación de cache cuando cambia el código fuente.

---

## FASE 7: Endpoints de la API

| Método | URL | Descripción |
|--------|-----|-------------|
| `GET` | `/api/health` | Verificar que el servicio está vivo |
| `POST` | `/api/contact` | Enviar mensaje de contacto |
| `GET` | `/api/contact` | Obtener todos los mensajes |
| `GET` | `/api/debug/email-test` | Probar envío de email |
| `GET` | `/h2-console` | Consola de base de datos (solo dev) |

---

## Conceptos Importantes para Estudiar

### Spring Boot
- **Inyección de Dependencias**: Spring crea y conecta los objetos automáticamente
- **Auto-configuración**: Configura beans basándose en las dependencias en el classpath
- **Profiles**: `prod` vs `dev` para diferentes configuraciones
- **JPA/Hibernate**: Mapea objetos Java a tablas de base de datos

### React
- **Componentes**: Piezas reutilizables de UI
- **Hooks**: `useState`, `useEffect` para estado y efectos secundarios
- **Props**: Datos que se pasan de padre a hijo
- **JSX**: HTML dentro de JavaScript

### Docker
- **Multi-stage builds**: Compilar en etapas separadas para imagen final pequeña
- **Layers**: Cada instrucción crea una capa cacheable
- **Alpine**: Distribución Linux minimalista (~5MB)

### REST API
- **GET**: Leer datos
- **POST**: Crear datos
- **Status Codes**: 200 (OK), 400 (Bad Request), 404 (Not Found), 500 (Server Error)

---

## Guía de Estudio Recomendada

1. **Primero**: Entender `application.properties` — toda la configuración
2. **Segundo**: Seguir el flujo de `ContactController` → `ContactService` → `ContactMessageRepository`
3. **Tercero**: Entender el Dockerfile multi-etapa
4. **Cuarto**: Estudiar cómo `Contact.jsx` maneja estados y envío de formularios
5. **Quinto**: Reproducir el proyecto localmente (`mvn spring-boot:run` + `npm run dev`)
