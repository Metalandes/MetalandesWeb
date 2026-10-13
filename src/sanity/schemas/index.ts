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
import { categoriaProductos } from "./categoriaProductos";
import { navegacion } from "./navegacion";
import { textosPagina } from "./textosPagina";

/** Tipos de contenido editables desde el Studio. */
export const schemaTypes: SchemaTypeDefinition[] = [
  portada,
  navegacion,
  producto,
  categoriaProductos,
  servicio,
  proyecto,
  certificacion,
  post,
  politica,
  faq,
  contacto,
  textosPagina,
];
