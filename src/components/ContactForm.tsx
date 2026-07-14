"use client";

import { useState } from "react";
import { CONTACT } from "@/lib/content";

type Status = "idle" | "sending" | "sent";

const FIELD =
  "w-full rounded-xl border border-[var(--border)] bg-black/[0.02] px-4 py-3 text-sm text-[var(--text)] outline-none transition placeholder:text-faint focus:border-cyan focus:bg-black/[0.04]";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });

  const valid =
    form.nombre.trim().length > 1 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    form.mensaje.trim().length > 4;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || status !== "idle") return;
    setStatus("sending");
    // Demo: no backend. Abre WhatsApp con el mensaje prellenado.
    const text = encodeURIComponent(
      `Hola Metalandes, soy ${form.nombre} (${form.email}). ${form.mensaje}`
    );
    setTimeout(() => {
      setStatus("sent");
      window.open(`https://wa.me/${CONTACT.whatsappHref}?text=${text}`, "_blank");
    }, 700);
  };

  if (status === "sent") {
    return (
      <div className="glass flex flex-col items-center gap-3 rounded-2xl p-10 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-cyan/15 text-2xl text-cyan">
          ✓
        </span>
        <p className="font-display text-xl font-semibold text-[var(--text)]">¡Mensaje listo!</p>
        <p className="max-w-sm text-sm text-muted">
          Abrimos WhatsApp para que envíes tu solicitud. Te responderemos pronto.
        </p>
        <button
          onClick={() => {
            setForm({ nombre: "", email: "", mensaje: "" });
            setStatus("idle");
          }}
          className="mt-2 text-sm text-cyan hover:underline"
        >
          Enviar otro
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="glass flex flex-col gap-4 rounded-2xl p-6 text-left md:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="nombre" className="mb-2 block text-xs tracking-widest text-faint">
            NOMBRE
          </label>
          <input
            id="nombre"
            className={FIELD}
            placeholder="Tu nombre"
            value={form.nombre}
            onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-xs tracking-widest text-faint">
            CORREO
          </label>
          <input
            id="email"
            type="email"
            className={FIELD}
            placeholder="tu@empresa.com"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
        </div>
      </div>
      <div>
        <label htmlFor="mensaje" className="mb-2 block text-xs tracking-widest text-faint">
          MENSAJE
        </label>
        <textarea
          id="mensaje"
          rows={4}
          className={`${FIELD} resize-none`}
          placeholder="Cuéntanos sobre tu proyecto…"
          value={form.mensaje}
          onChange={(e) => setForm((f) => ({ ...f, mensaje: e.target.value }))}
        />
      </div>
      <button
        type="submit"
        disabled={!valid || status === "sending"}
        className="group relative overflow-hidden rounded-xl bg-electric px-6 py-3.5 font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span className="relative z-10">
          {status === "sending" ? "Enviando…" : "Enviar solicitud"}
        </span>
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-cyan to-electric transition-transform duration-500 group-hover:translate-x-0" />
      </button>
    </form>
  );
}
