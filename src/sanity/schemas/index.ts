import type { SchemaTypeDefinition } from "sanity";
import { producto } from "./producto";
import { certificacion } from "./certificacion";
import { post } from "./post";
import { politica } from "./politica";
import { faq } from "./faq";
import { contacto } from "./contacto";

/** Tipos de contenido editables desde el Studio. */
export const schemaTypes: SchemaTypeDefinition[] = [
  producto,
  certificacion,
  post,
  politica,
  faq,
  contacto,
];
