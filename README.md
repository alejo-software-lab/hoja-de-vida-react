# Hoja de Vida — Alejandro Muñoz

Portafolio / hoja de vida personal desarrollado con **React + Vite + Tailwind CSS**, con un **backend en Node.js (Express)** que recibe los mensajes del formulario de contacto.

## Tecnologías

- **Frontend:** React 19, Vite, Tailwind CSS, lucide-react.
- **Backend:** Node.js, Express, CORS, Nodemailer.
- **Persistencia:** los mensajes se guardan en `server/messages.json` (no requiere base de datos).
- **Despliegue:** Render / Railway (gratuito).

## Puertos y rutas

- El servidor Express sirve tanto la web como la API.
- `POST /api/contact` → recibe `{ name, email, subject, message }`, valida y guarda el mensaje.
- En producción el backend sirve los archivos de `dist/`.

## Puesta en marcha (desarrollo)

```bash
npm install
npm run dev        # frontend con Vite (http://localhost:5173)
npm run server     # backend Express (http://localhost:3001)
```

> El proxy de Vite reenvía `/api` al backend en `http://localhost:3001`.

## Producción

```bash
npm run build      # genera la carpeta dist/
npm start          # Express sirve la web + API en http://localhost:3001
```

## Configuración de correo (opcional)

Copia `.env.example` a `.env` y completa tus credenciales SMTP para recibir
los mensajes del formulario por correo real:

```ini
SMTP_HOST=tu_smtp
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu_usuario
SMTP_PASS=tu_contraseña_o_token
MAIL_TO=Alejandromg94@outlook.com
```

Si no configuras el SMTP, los mensajes se guardan igualmente en
`server/messages.json`.

## Despliegue

- **Render:** conecta el repo de GitHub y usa `render.yaml` (Blueprint).
- **Railway:** conecta el repo de GitHub; detecta `Procfile` / `railway.toml`.

En el panel de la plataforma puedes agregar las variables SMTP para enviar
correos reales.

## Estructura

```
src/components/   Componentes de la UI (Hero, About, Skills, Experience, Projects, Contact, Footer, Navbar)
server/index.js   Backend Express (API de contacto + sirve dist/)
public/           Recursos estáticos (foto-alejo.jpg, favicon, icons)
```
