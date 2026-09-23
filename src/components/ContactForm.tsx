"use client";

import { useState } from "react";
import { useContacto } from "@/components/ContactoProvider";

type Campo = "nombre" | "email" | "mensaje";

const FIELD =
  "w-full rounded-xl border bg-black/[0.02] px-4 py-3 text-base text-[var(--text)] outline-none transition placeholder:text-faint focus:border-cyan focus:bg-black/[0.04] sm:text-sm";

const VALIDAR: Record<Campo, (v: string) => string | null> = {
  nombre: (v) => (v.trim().length > 1 ? null : "Escribe tu nombre."),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? null : "Revisa el correo: debe ser como nombre@empresa.com."),
  mensaje: (v) => (v.trim().length > 4 ? null : "Cuéntanos en pocas palabras qué necesitas."),
};

/**
 * El sitio no tiene servidor de correo: el formulario arma el mensaje y lo
 * abre en WhatsApp para que la persona lo envíe. El botón y la nota lo dicen
 * explícitamente para que nadie crea que el mensaje ya salió.
 */
export default function ContactForm() {
  const CONTACT = useContacto();
  const [form, setForm] = useState<Record<Campo, string>>({ nombre: "", email: "", mensaje: "" });
  const [intentado, setIntentado] = useState(false);
  const [enlace, setEnlace] = useState<string | null>(null);

  const errores = Object.fromEntries(
    (Object.keys(VALIDAR) as Campo[]).map((c) => [c, VALIDAR[c](form[c])])
  ) as Record<Campo, string | null>;
  const valido = !errores.nombre && !errores.email && !errores.mensaje;

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!valido) {
      setIntentado(true);
      // Lleva el foco al primer campo con error, útil en celular y con lector de pantalla.
      const primero = (Object.keys(errores) as Campo[]).find((c) => errores[c]);
      if (primero) e.currentTarget.querySelector<HTMLElement>(`#${primero}`)?.focus();
      return;
    }
    const texto = `Hola Metalandes, soy ${form.nombre.trim()} (${form.email.trim()}).\n\n${form.mensaje.trim()}`;
    const url = `https://wa.me/${CONTACT.whatsappHref}?text=${encodeURIComponent(texto)}`;
    setEnlace(url);
    /* Se abre dentro del mismo toque: Safari en iPhone bloquea las ventanas
       abiertas después de una espera. Si aun así se bloquea, se navega en la
       misma pestaña, que en el celular abre la app de WhatsApp. */
    const ventana = window.open(url, "_blank");
    if (ventana) ventana.opener = null;
    else window.location.href = url;
  };

  const actualizar = (c: Campo) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [c]: e.target.value }));

  const borde = (c: Campo) =>
    intentado && errores[c] ? "border-electric" : "border-[var(--border)]";

  const mensajeError = (c: Campo) =>
    intentado && errores[c] ? (
      <p id={`${c}-error`} className="mt-2 text-xs text-electric">
        {errores[c]}
      </p>
    ) : null;

  if (enlace) {
    return (
      <div role="status" className="glass flex flex-col items-center gap-3 rounded-2xl p-10 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-cyan/15 text-2xl text-cyan" aria-hidden>
          ✓
        </span>
        <p className="font-display text-xl font-semibold text-[var(--text)]">Tu mensaje está listo en WhatsApp</p>
        <p className="max-w-sm text-sm text-muted">
          Solo falta que lo envíes desde WhatsApp. Si no se abrió, usa este botón:
        </p>
        <a
          href={enlace}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-95"
        >
          Abrir WhatsApp
        </a>
        <button
          type="button"
          onClick={() => {
            setForm({ nombre: "", email: "", mensaje: "" });
            setIntentado(false);
            setEnlace(null);
          }}
          className="mt-1 text-sm text-muted underline-offset-4 hover:text-[var(--text)] hover:underline"
        >
          Escribir otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="glass flex flex-col gap-4 rounded-2xl p-6 text-left md:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="nombre" className="mb-2 block text-xs tracking-widest text-faint">
            NOMBRE
          </label>
          <input
            id="nombre"
            name="nombre"
            autoComplete="name"
            enterKeyHint="next"
            className={`${FIELD} ${borde("nombre")}`}
            placeholder="Tu nombre"
            value={form.nombre}
            onChange={actualizar("nombre")}
            aria-invalid={intentado && !!errores.nombre}
            aria-describedby={intentado && errores.nombre ? "nombre-error" : undefined}
          />
          {mensajeError("nombre")}
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-xs tracking-widest text-faint">
            CORREO
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="off"
            enterKeyHint="next"
            className={`${FIELD} ${borde("email")}`}
            placeholder="tu@empresa.com"
            value={form.email}
            onChange={actualizar("email")}
            aria-invalid={intentado && !!errores.email}
            aria-describedby={intentado && errores.email ? "email-error" : undefined}
          />
          {mensajeError("email")}
        </div>
      </div>
      <div>
        <label htmlFor="mensaje" className="mb-2 block text-xs tracking-widest text-faint">
          MENSAJE
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={4}
          className={`${FIELD} ${borde("mensaje")} resize-none`}
          placeholder="Cuéntanos sobre tu proyecto…"
          value={form.mensaje}
          onChange={actualizar("mensaje")}
          aria-invalid={intentado && !!errores.mensaje}
          aria-describedby={intentado && errores.mensaje ? "mensaje-error" : undefined}
        />
        {mensajeError("mensaje")}
      </div>
      <button
        type="submit"
        className="group relative overflow-hidden rounded-xl bg-electric px-6 py-3.5 font-semibold text-white"
      >
        <span className="relative z-10">Enviar por WhatsApp</span>
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-cyan to-electric transition-transform duration-500 group-hover:translate-x-0" />
      </button>
      <p className="text-center text-xs text-faint">
        Se abrirá WhatsApp con tu mensaje listo para enviar.
      </p>
    </form>
  );
}
