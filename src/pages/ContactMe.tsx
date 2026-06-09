import { useState } from "react";
import { useTranslation } from "../hooks/useTranslation";
import emailjs from "@emailjs/browser";

export default function ContactMe() {
  const { t } = useTranslation();
  const cp = t.contactMe;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  // Read EmailJS IDs from Vite env variables. Create a `.env.local` with these keys:
  // VITE_EMAILJS_SERVICE_ID=service_xxx
  // VITE_EMAILJS_TEMPLATE_ID=template_xxx
  // VITE_EMAILJS_PUBLIC_KEY=public_xxx
  // (Restart dev server after editing env files)
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "";
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "";
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "";

  async function handleSend() {
    if (!name && !email && !message) return;
    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS IDs missing. Set VITE_EMAILJS_SERVICE_ID/TEMPLATE_ID/PUBLIC_KEY in .env.local");
      setStatus("error");
      return;
    }
    setStatus("sending");

    try {
      const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
        to_email: "joh@mi.is",
      } as Record<string, string>;

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setName("");
      setEmail("");
      setMessage("");
      setStatus("sent");
    } catch (err) {
      console.error("Email send failed", err);
      setStatus("error");
    }
  }

  return (
    <div className="card" style={{ marginBottom: 120 }}>
      <h2>{cp.title}</h2>

      {status === "sent" ? (
        <div style={{ fontSize: 18, fontWeight: 700, padding: 24 }}>
          {cp.thankYouMessage}
        </div>
      ) : (
        <div className="tool-section">
          <label>{cp.nameLabel}</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="" />

          <label>{cp.emailLabel}</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="" />

          <label>{cp.messageLabel}</label>
          <textarea className="large-textarea" value={message} onChange={(e) => setMessage(e.target.value)} />

          <button onClick={handleSend} disabled={status === "sending"}>
            {status === "sending" ? "SENDING..." : cp.sendButton}
          </button>

          {status === "error" && <div className="error">{cp.errorMessage}</div>}
        </div>
      )}
    </div>
  );
}
