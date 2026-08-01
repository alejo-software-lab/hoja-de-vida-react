# Informe de Evaluación de Seguridad
## Sitio: `https://alejo-software-labs.onrender.com` — Formulario de contacto / envío de correo

| | |
|---|---|
| **Objetivo** | Portafolio/Hoja de Vida (SPA React) con formulario de contacto que envía correo vía API |
| **Alcance acordado** | Análisis pasivo + pruebas activas controladas (autorizadas por el solicitante) |
| **Fecha de la prueba** | 2026-08-01 |
| **Realizado por** | Jean Medina (jean.medina0399@gmail.com) |
| **Tipo de prueba** | Caja negra (black-box), sin credenciales |
| **Infraestructura detectada** | Frontend React (Vite) · Backend Java **Spring Boot** en **Render** · **Cloudflare** (CDN + WAF) · **EmailJS** (envío de correo desde el cliente) |

> **Nota de autorización:** las pruebas activas se realizaron con autorización explícita del solicitante. Durante la prueba se insertaron ~26 registros de prueba etiquetados `[PENTEST]` en la base de datos y se envió **1 correo de prueba** al buzón del propietario. Se recomienda purgar los registros de prueba (ver §7).

---

## 1. Resumen ejecutivo

El sitio publica un portafolio estático, pero su **formulario de contacto** activa dos canales de envío en paralelo:

1. `POST /api/contact` → backend Spring Boot que **guarda el mensaje en base de datos** (el envío de correo del backend está deshabilitado: `emailSent:false`).
2. **EmailJS** desde el navegador → `https://api.emailjs.com/api/v1.0/email/send-form` (este es el canal que realmente entrega el correo).

Se identificaron **9 hallazgos**, incluyendo **1 crítico** y **2 altos**. Los dos problemas más graves son:

- **Abuso del envío de correo (crítico):** las credenciales de EmailJS están embebidas en el JavaScript público y el único control (bloqueo de "no-navegador") **se evade trivialmente falsificando las cabeceras `Origin`/`Referer`**. Se confirmó el envío de un correo desde fuera del navegador (HTTP 200 OK). Un atacante puede agotar la cuota de correo y usar la cuenta para spam/phishing.
- **Exposición de datos personales (alto):** `GET /api/contact` devuelve **todos los mensajes almacenados sin autenticación** (nombre, correo y contenido de cada persona que ha escrito).

En positivo, existen varios controles funcionando: validación de entrada, WAF de Cloudflare bloqueando SQLi evidente, CORS no permisivo, y Actuator/Swagger no expuestos (ver §6).

### Cuadro de hallazgos

| # | Hallazgo | Tipo | Severidad | OWASP Top 10 (2021) | CWE |
|---|----------|------|-----------|---------------------|-----|
| 1 | Abuso de envío de correo vía EmailJS (credenciales expuestas + bypass de allowlist por spoofing de `Origin`/`Referer`) | Diseño inseguro / Secretos expuestos | **Crítica** | A04, A07, A02 | CWE-798, CWE-602 |
| 2 | `GET /api/contact` expone todos los mensajes sin autenticación (PII) | Control de acceso roto | **Alta** | A01 | CWE-284, CWE-200, CWE-639 |
| 3 | Sin rate-limiting / anti-automatización en el envío | Falta de control de recursos | **Alta** | A04 | CWE-770, CWE-799 |
| 4 | XSS almacenado / inyección HTML en los campos del formulario | Inyección | **Media** | A03 | CWE-79 |
| 5 | Ausencia total de cabeceras de seguridad HTTP | Configuración incorrecta | **Media** | A05 | CWE-693, CWE-1021 |
| 6 | Divulgación de información en errores (excepciones Spring, 500 genérico) | Configuración incorrecta | **Media** | A05 | CWE-209, CWE-200 |
| 7 | Posible *mass assignment* (campos no esperados aceptados) | Diseño inseguro | **Baja** | A08 | CWE-915 |
| 8 | Identificadores secuenciales/enumerables (`messageId` incremental) | Diseño inseguro | **Baja** | A04 | CWE-340 |
| 9 | Lógica de doble canal inconsistente (backend `emailSent:false`) | Diseño / fiabilidad | **Baja / Informativa** | A04 | CWE-710 |

---

## 2. Alcance y metodología

- **Reconocimiento pasivo:** análisis del HTML, del bundle JavaScript (`/assets/index-DE0AvrJ9.js`), de las cabeceras HTTP de respuesta y de la configuración de terceros (EmailJS).
- **Pruebas activas controladas:** peticiones a `/api/contact` (validación, inyección, métodos HTTP, CORS, rate-limiting), enumeración de rutas, verificación de exposición de Spring Boot Actuator, y prueba de abuso de la API de EmailJS desde un contexto no-navegador (curl).
- **No se realizó:** explotación destructiva, fuerza bruta masiva, exfiltración real de datos de terceros, ni pruebas de denegación de servicio sostenida.

---

## 3. Hallazgos detallados

### 🔴 Hallazgo 1 — Abuso del envío de correo (EmailJS): credenciales expuestas + bypass de allowlist — **CRÍTICA**

**Tipo:** Diseño inseguro / Exposición de secretos / Autenticación rota
**OWASP:** A04 Insecure Design, A07 Identification & Auth Failures, A02 Cryptographic/Secrets
**CWE:** CWE-798 (credenciales embebidas), CWE-602 (control de seguridad del lado servidor delegado al cliente)

**Descripción.** El envío de correo real se hace con **EmailJS desde el navegador**. Todas las credenciales quedan en el JavaScript público y son recuperables por cualquiera:

| Credencial | Valor observado |
|---|---|
| `service_id` | `service_apeyqkc` |
| `template_id` | `template_1txr2jd` |
| `public key (user_id)` | `32cHoh6lAn6OMgNP7` |

El único control activo en la cuenta EmailJS es *"API access from non-browser environments is disabled"*. **Ese control es insuficiente** porque se basa en las cabeceras `Origin`/`User-Agent`, que el cliente controla y puede falsificar.

**Evidencia (reproducible con `curl`):**

1. Llamada "honesta" fuera del navegador → bloqueada:
```
POST https://api.emailjs.com/api/v1.0/email/send
→ HTTP 403  "API access from non-browser environments is currently disabled."
```

2. La **misma** llamada añadiendo cabeceras `Origin`/`Referer`/`User-Agent` falsificados → **aceptada y correo enviado**:
```bash
curl -X POST 'https://api.emailjs.com/api/v1.0/email/send' \
  -H 'Content-Type: application/json' \
  -H 'Origin: https://alejo-software-labs.onrender.com' \
  -H 'Referer: https://alejo-software-labs.onrender.com/' \
  -H 'User-Agent: Mozilla/5.0 ... Chrome/126.0 Safari/537.36' \
  --data '{"service_id":"service_apeyqkc","template_id":"template_1txr2jd",
           "user_id":"32cHoh6lAn6OMgNP7","template_params":{...}}'
→ HTTP 200  "OK"   ← correo entregado
```

**Impacto.**
- **Agotamiento de cuota:** un atacante puede consumir toda la cuota de EmailJS (en plan gratuito ~200 correos/mes), **inutilizando el canal de contacto legítimo**.
- **Spam / phishing:** puede enviar correos de forma automatizada usando la plantilla y el remitente configurados en la cuenta del propietario, dañando su reputación y la del dominio.
- **Coste económico** si el plan es de pago por volumen.

**Remediación.**
1. **Mover el envío de correo al backend** (Spring Boot ya recibe el mensaje en `/api/contact`). Usar SMTP/API de correo con las credenciales **solo en el servidor**, nunca en el cliente. Eliminar EmailJS del frontend.
2. Si se mantiene EmailJS temporalmente: activar el uso de **Private Key** (firma del lado servidor), configurar el **allowlist de dominios**, y añadir **CAPTCHA** (p. ej. Cloudflare Turnstile) + **rate-limiting** en el formulario.
3. **Rotar/regenerar** las credenciales de EmailJS actuales, ya que están expuestas públicamente.

---

### 🟠 Hallazgo 2 — Exposición de todos los mensajes sin autenticación (`GET /api/contact`) — **ALTA**

**Tipo:** Control de acceso roto / Exposición de datos sensibles
**OWASP:** A01 Broken Access Control
**CWE:** CWE-284, CWE-200, CWE-639

**Descripción.** El endpoint `GET /api/contact` devuelve, **sin ninguna autenticación**, el listado completo de mensajes almacenados, incluyendo datos personales de terceros (nombre, correo electrónico y contenido del mensaje).

**Evidencia:**
```
GET /api/contact  → HTTP 200
[
  {"id":2,"name":"...","email":"...","subject":"...","message":"...","receivedAt":"...","emailSent":false},
  {"id":1,"name":"...","email":"...","subject":"...","message":"...","receivedAt":"...","emailSent":false}
]
```

**Impacto.**
- Cualquier persona en Internet puede **leer los datos de contacto de todos los que han escrito** por el formulario.
- **Implicación legal (Colombia):** es tratamiento de datos personales sin control de acceso; incumple la **Ley 1581 de 2012 (Habeas Data)** y su principio de seguridad. Análogo a GDPR en la UE.

**Remediación.**
1. **Eliminar** el método `GET` público de `/api/contact` (el formulario solo necesita `POST`).
2. Si se requiere consultar los mensajes, exponerlos en una **ruta administrativa autenticada** (login + autorización por rol), fuera del alcance público.
3. Revisar registros de acceso para estimar si los datos ya fueron consultados por terceros.

---

### 🟠 Hallazgo 3 — Sin rate-limiting ni protección anti-automatización — **ALTA**

**Tipo:** Falta de control de recursos
**OWASP:** A04 Insecure Design
**CWE:** CWE-770 (asignación sin límite), CWE-799 (control de frecuencia)

**Descripción.** El endpoint `POST /api/contact` no aplica límite de tasa. **20 peticiones concurrentes se procesaron en 1,8 s, todas con HTTP 200.** No hay CAPTCHA ni token anti-automatización en el formulario.

**Evidencia:**
```
20 POST concurrentes /api/contact → {"200": 20} en 1807 ms
```

**Impacto.**
- **Inundación de la base de datos** con registros basura.
- Combinado con el Hallazgo 1, permite **flooding del buzón** del propietario y agotamiento de cuota de correo.
- Vector de **denegación de servicio** de bajo costo.

**Remediación.**
1. Rate-limiting por IP (a nivel aplicación y/o **Cloudflare Rate Limiting Rules**).
2. **CAPTCHA / Turnstile** en el formulario.
3. Límite de tamaño de payload y validación de longitud por campo.
4. Considerar un token anti-CSRF/anti-bot de un solo uso.

---

### 🟡 Hallazgo 4 — XSS almacenado / inyección HTML en los campos del formulario — **MEDIA**

**Tipo:** Inyección (Cross-Site Scripting almacenado)
**OWASP:** A03 Injection
**CWE:** CWE-79

**Descripción.** Los campos se almacenan **sin sanitización**. Un payload con `<script>`, `<img src=x onerror=...>` y `<svg/onload=...>` se guardó correctamente (`messageId:3`) y se devuelve **tal cual** en `GET /api/contact`. El mismo contenido se inserta en la plantilla del correo enviado por EmailJS.

**Evidencia:**
```
POST /api/contact  name=<script>alert(1)</script>  subject=<img src=x onerror=alert(1)>
                   message=<svg/onload=alert(1)>
→ 200  {"saved":true,"messageId":3}   (almacenado sin escapar)
```

**Impacto.** Ejecución de script en cualquier punto que renderice estos datos como HTML sin escapar:
- Un futuro **panel de administración** que muestre los mensajes.
- El **correo HTML** que recibe el propietario (inyección HTML / phishing dentro del propio correo).

**Remediación.**
1. **Codificar/escapar en la salida** (contexto HTML) en cualquier vista que muestre los mensajes.
2. Sanitizar/validar la entrada (listas de caracteres permitidos, longitud máxima).
3. Enviar el correo como texto plano o escapar las variables en la plantilla EmailJS/servidor.
4. Aplicar **Content-Security-Policy** (ver Hallazgo 5) como defensa en profundidad.

---

### 🟡 Hallazgo 5 — Ausencia total de cabeceras de seguridad HTTP — **MEDIA**

**Tipo:** Configuración de seguridad incorrecta
**OWASP:** A05 Security Misconfiguration
**CWE:** CWE-693 (mecanismo de protección ausente), CWE-1021 (clickjacking)

**Descripción.** Ni las respuestas del sitio ni las de la API incluyen cabeceras de seguridad. Faltan **todas** las siguientes:

| Cabecera ausente | Riesgo que mitiga |
|---|---|
| `Content-Security-Policy` | XSS, inyección de recursos |
| `Strict-Transport-Security` (HSTS) | Downgrade a HTTP / MITM |
| `X-Frame-Options` / `frame-ancestors` | Clickjacking |
| `X-Content-Type-Options: nosniff` | MIME sniffing |
| `Referrer-Policy` | Fuga de URLs por `Referer` |
| `Permissions-Policy` | Abuso de APIs del navegador |

**Remediación.** Añadir las cabeceras en el backend (filtro de Spring Security) o en Cloudflare (Transform Rules / Response Headers). Configuración recomendada mínima:
```
Content-Security-Policy: default-src 'self'; script-src 'self'; connect-src 'self' https://api.emailjs.com; object-src 'none'; frame-ancestors 'none'
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

---

### 🟡 Hallazgo 6 — Divulgación de información en el manejo de errores — **MEDIA**

**Tipo:** Configuración incorrecta / Divulgación de información
**OWASP:** A05 Security Misconfiguration
**CWE:** CWE-209 (mensaje de error con información sensible), CWE-200

**Descripción.** Las respuestas de error devuelven **nombres de clases de excepción de Spring** al cliente y usan códigos de estado inadecuados (500 en lugar de 404/405/415).

**Evidencia:**
```
GET  /api/contact/1               → 500  "NoResourceFoundException: No static resource api/contact/1."
POST (form-urlencoded)            → 500  "HttpMediaTypeNotSupportedException: Content-Type ... is not supported"
PUT  /api/contact                 → 500  "HttpRequestMethodNotSupportedException: Request method 'PUT' is not supported"
```

**Impacto.** Facilita la toma de huellas del stack (Java/Spring Boot), la enumeración de rutas y el diseño de ataques dirigidos.

**Remediación.**
1. `@ControllerAdvice` global que devuelva mensajes genéricos y **códigos correctos** (404 recurso no encontrado, 405 método no permitido, 415 tipo no soportado, 400 validación).
2. No incluir nombres de excepción ni trazas en las respuestas. Registrar el detalle solo en logs del servidor.

---

### 🔵 Hallazgo 7 — Posible *mass assignment* — **BAJA**

**Tipo:** Diseño inseguro / *Mass Assignment*
**OWASP:** A08
**CWE:** CWE-915

**Descripción.** El endpoint aceptó sin error un cuerpo con campos no previstos (`id`, `emailSent`, `isAdmin`, `role`). No se confirmó que se vinculen a la entidad, pero deben rechazarse explícitamente.
**Remediación.** Usar un **DTO** con solo los campos permitidos (`name`, `email`, `subject`, `message`) y `FAIL_ON_UNKNOWN_PROPERTIES=true` en Jackson. No exponer la entidad de persistencia directamente.

---

### 🔵 Hallazgo 8 — Identificadores secuenciales/enumerables — **BAJA**

**Tipo:** Diseño inseguro
**CWE:** CWE-340

**Descripción.** `messageId` es un entero incremental (`1, 2, 3, ...`). Combinado con un endpoint de lectura por ID (si se añade en el futuro), habilitaría enumeración (IDOR).
**Remediación.** Usar **UUID** como identificador público y no exponer contadores internos.

---

### 🔵 Hallazgo 9 — Lógica de doble canal inconsistente — **BAJA / INFORMATIVA**

**Tipo:** Diseño / fiabilidad
**CWE:** CWE-710

**Descripción.** El backend responde `emailSent:false` (el correo del servidor **no** se envía) y la entrega depende exclusivamente de EmailJS en el cliente. Esto significa que la fiabilidad y la seguridad del envío recaen en el navegador del usuario.
**Remediación.** Unificar en un **único canal servidor** (ver Hallazgo 1), con manejo de errores y reintentos, para que el envío no dependa del cliente.

---

## 4. Priorización de la remediación

| Prioridad | Acción | Hallazgos |
|---|---|---|
| **1 — Inmediata** | Mover el envío de correo al backend y **rotar** credenciales EmailJS; eliminar EmailJS del cliente | 1 |
| **2 — Inmediata** | Quitar `GET /api/contact` público (o protegerlo con autenticación) | 2 |
| **3 — Corto plazo** | Rate-limiting + CAPTCHA en el formulario | 3 |
| **4 — Corto plazo** | Escapar salida / sanitizar entrada (XSS) | 4 |
| **5 — Corto plazo** | Añadir cabeceras de seguridad HTTP | 5 |
| **6 — Medio plazo** | Manejo global de errores con códigos correctos | 6 |
| **7 — Endurecimiento** | DTO estricto, UUIDs, unificación de canal | 7, 8, 9 |

---

## 5. Superficie técnica identificada

- **Frontend:** React (Vite), SPA servida como estático. Bundle: `/assets/index-DE0AvrJ9.js`.
- **Backend:** Java **Spring Boot** (confirmado por las excepciones), en **Render** (`x-render-origin-server: Render`).
- **CDN/WAF:** **Cloudflare** (`server: cloudflare`, `cf-ray`).
- **Envío de correo:** **EmailJS** (`service_apeyqkc` / `template_1txr2jd`), plantilla del lado cliente.
- **Endpoints observados:** `POST /api/contact` (crea), `GET /api/contact` (lista — expuesto). `PUT`/`DELETE` no soportados. Actuator/Swagger **no** expuestos.

---

## 6. Controles positivos observados (lo que sí está bien)

- ✅ **Validación de entrada** en el backend: campos obligatorios y formato de email (`400` con mensajes claros).
- ✅ **Cloudflare WAF** bloquea inyección SQL evidente (`403 Blocked`).
- ✅ **EmailJS "non-browser API" deshabilitado** (aunque evadible — Hallazgo 1).
- ✅ **CORS no permisivo:** no se refleja `Access-Control-Allow-Origin` para orígenes arbitrarios.
- ✅ **Spring Boot Actuator y Swagger no expuestos.**
- ✅ **HTTPS/TLS** forzado a través de Cloudflare.

---

## 7. Artefactos de la prueba (limpieza recomendada)

Durante las pruebas autorizadas se generaron:
- **~26 registros de prueba** en la base de datos, todos etiquetados con el prefijo `[PENTEST]` en los campos `name`/`subject` (incluye 1 registro con payload XSS de prueba). **Se recomienda eliminarlos.**
- **1 correo de prueba** entregado al buzón del propietario (asunto `[PENTEST] EmailJS origin-spoof test`).

No se accedió, copió ni divulgó ningún dato personal real de terceros almacenado en el sistema.

---

## 8. Metodología de referencia

Evaluación alineada con **OWASP Top 10 (2021)** y **OWASP Web Security Testing Guide (WSTG)**. Clasificación de tipos según **CWE**. Severidades asignadas cualitativamente según impacto y facilidad de explotación.

---
*Informe generado el 2026-08-01. Documento destinado a la corrección de vulnerabilidades por parte del propietario del sistema.*
