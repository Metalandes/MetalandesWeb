"use client";

import { createContext, useContext } from "react";
import { CONTACT } from "@/lib/content";
import type { Contacto } from "@/lib/contacto";

const Ctx = createContext<Contacto>(CONTACT);

export function ContactoProvider({
  value,
  children,
}: {
  value: Contacto;
  children: React.ReactNode;
}) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/** Datos de contacto vigentes, editables desde el Studio. */
export function useContacto() {
  return useContext(Ctx);
}
