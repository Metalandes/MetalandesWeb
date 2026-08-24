import type { SchemaTypeDefinition } from "sanity";
import { producto } from "./producto";
import { certificacion } from "./certificacion";
import { post } from "./post";
import { politica } from "./politica";
import { faq } from "./faq";
import { contacto } from "./contacto";
import { portada } from "./portada";
import { servicio } from "./servicio";
import { proyecto } from "./proyecto";
import { paginaProductos } from "./paginaProductos";

/** Tipos de contenido editables desde el Studio. */
export const schemaTypes: SchemaTypeDefinition[] = [
  portada,
  producto,
  paginaProductos,
  servicio,
  proyecto,
  certificacion,
  post,
  politica,
  faq,
  contacto,
];
