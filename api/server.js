// API de contacto — servicio Node sin dependencias externas.
// Reemplaza al backend Spring Boot: valida, escapa, limita por IP y envía
// el correo vía Resend con la API key SOLO en el servidor (nunca en el cliente).

import http from "node:http";

const PORT = process.env.PORT || 3001;
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const MAIL_TO = process.env.MAIL_TO || "alejosoftwarelabs@gmail.com";
const MAIL_FROM = process.env.MAIL_FROM || "CV Website <onboarding@resend.dev>";
const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET || "";
// Orígenes permitidos para CORS, separados por coma. En dev el proxy de Vite
// hace que la petición sea del mismo origen, así que no hace falta listarlo.
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

// --- Límites de validación (equivalentes a los del backend anterior) ---
const LIMITS = { name: 100, email: 150, subject: 200, message: 5000 };
const MAX_BODY_BYTES = 16 * 1024; // 16 KB
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// --- Rate limit en memoria por IP: máx. peticiones en una ventana ---
const RATE_MAX = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutos
const hits = new Map(); // ip -> number[] (timestamps)

function rateLimited(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > RATE_MAX;
}

// Limpieza periódica para que el Map no crezca sin límite.
setInterval(() => {
  const now = Date.now();
  for (const [ip, arr] of hits) {
    const keep = arr.filter((t) => now - t < RATE_WINDOW_MS);
    if (keep.length) hits.set(ip, keep);
    else hits.delete(ip);
  }
}, RATE_WINDOW_MS).unref();

const ESCAPE = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ESCAPE[c]);

function clientIp(req) {
  const xff = req.headers["x-forwarded-for"];
  if (xff) return xff.split(",")[0].trim(); // Render/Cloudflare ponen la IP real aquí
  return req.socket.remoteAddress || "unknown";
}

function corsHeaders(origin) {
  const h = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
    // Cabeceras de seguridad (defensa en profundidad)
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer",
  };
  if (ALLOWED_ORIGINS.length === 0 || (origin && ALLOWED_ORIGINS.includes(origin))) {
    h["Access-Control-Allow-Origin"] = origin || "*";
  }
  return h;
}

function send(res, status, headers, payload) {
  res.writeHead(status, { "Content-Type": "application/json", ...headers });
  res.end(JSON.stringify(payload));
}

function validate(data) {
  const errors = {};
  const clean = {};
  for (const field of ["name", "email", "subject", "message"]) {
    const val = typeof data[field] === "string" ? data[field].trim() : "";
    if (!val) errors[field] = "Este campo es requerido.";
    else if (val.length > LIMITS[field]) errors[field] = `Máximo ${LIMITS[field]} caracteres.`;
    clean[field] = val;
  }
  if (clean.email && !EMAIL_RE.test(clean.email)) errors.email = "El correo no es válido.";
  return { errors, clean };
}

async function verifyTurnstile(token, ip) {
  if (!TURNSTILE_SECRET) return true; // desactivado si no hay secret
  try {
    const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: TURNSTILE_SECRET, response: token || "", remoteip: ip }),
    });
    const j = await r.json();
    return j.success === true;
  } catch {
    return false;
  }
}

function buildHtml(m) {
  const n = escapeHtml(m.name);
  const e = escapeHtml(m.email);
  const s = escapeHtml(m.subject);
  const msg = escapeHtml(m.message).replace(/\n/g, "<br>");
  return `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
    <h2 style="color:#333;">Nuevo mensaje de contacto</h2>
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:8px;font-weight:bold;">Nombre:</td><td style="padding:8px;">${n}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Email:</td><td style="padding:8px;">${e}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Asunto:</td><td style="padding:8px;">${s}</td></tr>
    </table>
    <div style="margin-top:16px;padding:16px;background:#f5f5f5;border-radius:8px;">${msg}</div>
  </div>`;
}

async function sendEmail(m) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
    body: JSON.stringify({
      from: MAIL_FROM,
      to: [MAIL_TO],
      reply_to: m.email,
      subject: `[CV] ${m.subject}`,
      html: buildHtml(m),
    }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend HTTP ${res.status}: ${detail}`);
  }
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    let done = false;
    const chunks = [];
    req.on("data", (c) => {
      if (done) return;
      size += c.length;
      if (size > MAX_BODY_BYTES) {
        done = true;
        reject(new Error("payload_too_large"));
        req.resume(); // drena el resto del cuerpo sin resetear el socket
        return;
      }
      chunks.push(c);
    });
    req.on("end", () => {
      if (!done) resolve(Buffer.concat(chunks).toString("utf8"));
    });
    req.on("error", (e) => {
      if (!done) {
        done = true;
        reject(e);
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const origin = req.headers.origin;
  const cors = corsHeaders(origin);

  // Health check (Render / uptime pings)
  if (req.method === "GET" && (req.url === "/" || req.url === "/health")) {
    return send(res, 200, cors, { ok: true, service: "cv-contact-api" });
  }

  if (req.url !== "/api/contact") return send(res, 404, cors, { error: "not_found" });

  if (req.method === "OPTIONS") {
    res.writeHead(204, cors);
    return res.end();
  }
  if (req.method !== "POST") return send(res, 405, cors, { error: "method_not_allowed" });

  const ip = clientIp(req);
  if (rateLimited(ip)) {
    return send(res, 429, cors, { ok: false, error: "Demasiados envíos. Intenta de nuevo en unos minutos." });
  }

  let data;
  try {
    const raw = await readBody(req);
    data = JSON.parse(raw || "{}");
  } catch (e) {
    const tooLarge = e.message === "payload_too_large";
    return send(res, tooLarge ? 413 : 400, cors, { ok: false, error: "Solicitud inválida." });
  }

  // Honeypot: campo oculto que un humano nunca rellena. Si viene con datos, es un bot.
  if (typeof data.company === "string" && data.company.trim() !== "") {
    return send(res, 200, cors, { ok: true }); // fingir éxito, no enviar
  }

  const { errors, clean } = validate(data);
  if (Object.keys(errors).length) return send(res, 400, cors, { ok: false, errors });

  if (!(await verifyTurnstile(data.turnstileToken, ip))) {
    return send(res, 400, cors, { ok: false, error: "Verificación anti-bot fallida." });
  }

  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY no configurada — no se puede enviar el correo.");
    return send(res, 500, cors, { ok: false, error: "El servicio de correo no está disponible." });
  }

  try {
    await sendEmail(clean);
    return send(res, 200, cors, { ok: true });
  } catch (err) {
    console.error("EMAIL_SEND_FAILED:", err.message); // detalle solo en logs
    return send(res, 502, cors, { ok: false, error: "No se pudo enviar el mensaje. Intenta más tarde." });
  }
});

server.listen(PORT, () => console.log(`cv-contact-api escuchando en :${PORT}`));
