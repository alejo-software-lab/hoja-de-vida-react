import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { promises as fs } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ ok: false, error: "Faltan campos requeridos." });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ ok: false, error: "El correo no es válido." });
  }

  const entry = {
    name,
    email,
    subject,
    message,
    receivedAt: new Date().toISOString(),
  };

  // Guardar el mensaje en un archivo (persistencia simple)
  try {
    const file = join(__dirname, "messages.json");
    let list = [];
    try {
      list = JSON.parse(await fs.readFile(file, "utf-8"));
    } catch {
      list = [];
    }
    list.push(entry);
    await fs.writeFile(file, JSON.stringify(list, null, 2));
  } catch (err) {
    console.error("No se pudo guardar el mensaje:", err);
  }

  // Enviar correo si hay configuración SMTP
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.MAIL_FROM || process.env.SMTP_USER,
        to: process.env.MAIL_TO || "Alejandromg94@outlook.com",
        replyTo: email,
        subject: `[CV] ${subject}`,
        text: `Nombre: ${name}\nCorreo: ${email}\n\n${message}`,
      });
    } catch (err) {
      console.error("No se pudo enviar el correo:", err);
      return res
        .status(200)
        .json({ ok: true, saved: true, emailSent: false, note: "Mensaje guardado, pero el correo no se envió." });
    }
    return res.status(200).json({ ok: true, saved: true, emailSent: true });
  }

  // Sin SMTP configurado: solo se guarda el mensaje
  return res.status(200).json({ ok: true, saved: true, emailSent: false });
});

// Servir el frontend construido (dist)
const dist = join(__dirname, "..", "dist");
app.use(express.static(dist));

app.get("*", (req, res) => {
  res.sendFile(join(dist, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
