import { CONTACT } from "@/lib/content";

const MESSAGE = "Hola Metalandes, quisiera más información.";

export default function WhatsAppButton() {
  const href = `https://wa.me/${CONTACT.whatsappHref}?text=${encodeURIComponent(MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-3"
    >
      <span className="pointer-events-none hidden rounded-full bg-white px-4 py-2 text-sm font-medium text-[var(--text)] opacity-0 shadow-lg transition group-hover:opacity-100 md:block">
        Escríbenos
      </span>
      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] shadow-[0_10px_30px_-8px_rgba(37,211,102,0.7)] transition hover:scale-105">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-40" />
        <svg viewBox="0 0 32 32" className="relative h-7 w-7 fill-white" aria-hidden>
          <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.1 1.6 5.9L4 29l8.3-1.6c1.7.9 3.6 1.4 5.7 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7.7.7-3.6-.2-.4c-1-1.6-1.5-3.4-1.5-5.3C5.6 9.3 10.3 4.8 16 4.8S26.4 9.3 26.4 15 21.7 24.8 16 24.8zm5.5-7.3c-.3-.2-1.8-.9-2-1s-.5-.2-.7.2-.8 1-.9 1.2-.3.2-.6.1c-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1s0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5s0-.4 0-.5c-.1-.2-.7-1.6-.9-2.2s-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.4 1 2.8 1.2 3 2 3.1 4.9 4.3c.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.8-.7 2-1.4s.3-1.3.2-1.4c-.1-.2-.3-.2-.6-.4z" />
        </svg>
      </span>
    </a>
  );
}
