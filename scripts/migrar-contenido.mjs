/**
 * Migra a Sanity el contenido que todavía vive en src/lib/content.ts:
 * certificaciones, preguntas frecuentes, datos de contacto y las cuatro
 * páginas institucionales, con sus documentos adjuntos.
 *
 * Idempotente: usa _id fijos, así que volver a correrlo actualiza sin duplicar.
 *
 *   node scripts/migrar-contenido.mjs
 */
import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "node:fs";
import { config } from "dotenv";

config({ path: ".env.local" });

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  console.error("\nFalta SANITY_API_WRITE_TOKEN en .env.local\n");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token,
  apiVersion: "2026-08-23",
  useCdn: false,
});

/** Convierte párrafos de texto plano a los bloques que usa el editor. */
const bloques = (parrafos) =>
  parrafos.filter(Boolean).map((texto, i) => ({
    _type: "block",
    _key: `b${i}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `s${i}`, text: texto, marks: [] }],
  }));

async function subirArchivo(ruta, filename) {
  if (!existsSync(ruta)) {
    console.warn(`  ⚠ no encontrado: ${ruta}`);
    return undefined;
  }
  const asset = await client.assets.upload("file", readFileSync(ruta), { filename });
  return { _type: "file", asset: { _type: "reference", _ref: asset._id } };
}

async function subirImagen(ruta, filename) {
  if (!existsSync(ruta)) {
    console.warn(`  ⚠ no encontrada: ${ruta}`);
    return undefined;
  }
  const asset = await client.assets.upload("image", readFileSync(ruta), { filename });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

const CERTIFICACIONES = [
  ["iso-9001", "ISO 9001:2015", "Sistema de Gestión de la Calidad", "iso", "Kiwa CQR SAS", "Vigente hasta agosto 2027", "src/assets/certificados/iso-9001.jpg"],
  ["iso-14001", "ISO 14001:2015", "Sistema de Gestión Ambiental", "iso", "Kiwa CQR SAS", "Vigente hasta febrero 2027", "src/assets/certificados/iso-14001.jpg"],
  ["iso-45001", "ISO 45001:2018", "Seguridad y Salud en el Trabajo", "iso", "Kiwa CQR SAS", "Vigente hasta febrero 2027", "src/assets/certificados/iso-45001.jpg"],
  ["retie-0307", "Cert. 0307", "Envolventes vacías / tableros auto soportados", "retie", "Certicheck S.A.S · Esquema 5 RETIE", "Vigente hasta diciembre 2030", "src/assets/certificados/retie-0307.png"],
  ["retie-0308", "Cert. 0308", "Tableros de baja tensión", "retie", "Certicheck S.A.S · Esquema 5 RETIE", "Vigente hasta diciembre 2030", "src/assets/certificados/retie-0308.png"],
  ["retie-0309", "Cert. 0309", "Celdas de media tensión", "retie", "Certicheck S.A.S · Esquema 5 RETIE", "Vigente hasta diciembre 2030", "src/assets/certificados/retie-0309.png"],
  ["retie-0310", "Cert. 0310", "Tableros de transferencias automáticas de carga", "retie", "Certicheck S.A.S · Esquema 5 RETIE", "Vigente hasta diciembre 2030", "src/assets/certificados/retie-0310.png"],
];

const FAQS = [
  ["¿Qué tipo de subestaciones fabrican?", "Diseñamos y construimos subestaciones de media y baja tensión bajo modalidad llave en mano, adaptadas a la capacidad y ubicación de cada proyecto."],
  ["¿Atienden proyectos fuera de Antioquia?", "Sí. Operamos en todo el territorio colombiano y atendemos requerimientos del mercado internacional."],
  ["¿Ofrecen mantenimiento a infraestructura existente?", "Contamos con planes de mantenimiento predictivo, preventivo y correctivo con disponibilidad de respuesta para asegurar la continuidad operativa."],
  ["¿Cómo solicito una cotización?", "Escríbenos por WhatsApp o al correo info@metalandes.com con el alcance del proyecto. Nuestro equipo de ingeniería responde con una propuesta a la medida."],
];

async function main() {
  console.log("Certificaciones");
  for (const [id, codigo, nombre, tipo, emisor, validez, ruta] of CERTIFICACIONES) {
    const imagen = await subirImagen(ruta, ruta.split("/").pop());
    await client.createOrReplace({
      _id: `certificacion-${id}`,
      _type: "certificacion",
      codigo,
      nombre,
      tipo,
      emisor,
      validez,
      imagen,
      orden: CERTIFICACIONES.findIndex((c) => c[0] === id) * 10 + 10,
    });
    console.log(`  ✓ ${codigo}`);
  }

  console.log("Preguntas frecuentes");
  for (const [i, [pregunta, respuesta]] of FAQS.entries()) {
    await client.createOrReplace({
      _id: `faq-${i + 1}`,
      _type: "faq",
      pregunta,
      respuesta,
      orden: (i + 1) * 10,
    });
    console.log(`  ✓ ${pregunta.slice(0, 45)}…`);
  }

  console.log("Datos de contacto");
  await client.createOrReplace({
    _id: "contacto",
    _type: "contacto",
    direccion: "Cra. 53 No. 29 C 73, Medellín, Colombia",
    telefono: "(57) 604 444 6153",
    telefonoHref: "+576044446153",
    whatsapp: "+57 324 351 5023",
    whatsappHref: "573243515023",
    email: "info@metalandes.com",
    emailCalidad: "calidad@metalandes.com",
    emergencia: "310 668 2128",
    emergenciaHref: "+573106682128",
    extensiones: [
      { _key: "e1", area: "Mantenimiento y servicios", ext: "119 · 219" },
      { _key: "e2", area: "Equipo comercial", ext: "104 · 110 · 114 · 124 · 125 · 126" },
      { _key: "e3", area: "Almacén", ext: "102" },
      { _key: "e4", area: "Compras", ext: "109" },
    ],
    instagram: "https://www.instagram.com/metalandes/",
    facebook: "https://www.facebook.com/metalandes.sas",
    linkedin: "https://www.linkedin.com/company/metalandes-sas/",
    youtube: "http://youtube.com/metalandes",
  });
  console.log("  ✓ contacto");

  console.log("Páginas institucionales");
  const pdfDatos = await subirArchivo(
    "public/documentos/politica-tratamiento-datos.pdf",
    "politica-tratamiento-datos.pdf"
  );
  const formatoPqr = await subirArchivo(
    "public/documentos/formulario-pqr.xlsx",
    "formulario-pqr.xlsx"
  );

  const PAGINAS = [
    {
      clave: "gestion-integral",
      titulo: "Gestión integral",
      intro: "Política del Sistema Integrado de Gestión",
      lista: [
        "Sistema de seguridad y salud en el trabajo: identificación de peligros, valoración de riesgos y controles que previenen accidentes y enfermedades laborales.",
        "Cumplimiento de requisitos legales aplicables y otros suscritos voluntariamente.",
        "Prevención de la contaminación ambiental y mejora continua de los procesos.",
        "Consulta y participación de los interesados.",
      ],
      tarjetas: [
        { _key: "t1", titulo: "Gestión de la calidad", texto: "La herramienta que garantiza que los bienes y servicios ofrecidos satisfacen las necesidades del cliente: planeación, control, aseguramiento y mejora de procesos, materias primas, insumos y recursos." },
        { _key: "t2", titulo: "Seguridad y salud en el trabajo", texto: "Los principales riesgos de nuestra actividad son la exposición a tensión eléctrica, posturas prolongadas y manejo de cargas, ruido, golpes y caídas. Prevenimos con programas de gestión de riesgos y vigilancia epidemiológica." },
        { _key: "t3", titulo: "Gestión ambiental", texto: "Controlamos el uso de agua, el consumo de energía y la generación de residuos, con acciones de prevención y mitigación, sensibilización y mejora continua del desempeño ambiental." },
      ],
      cierre: "Esta política tiene alcance sobre todos los centros de trabajo de la organización. En seguridad y salud en el trabajo cubre a todos los trabajadores, incluyendo contratistas y subcontratistas. — Daniel Gómez Botero, Representante legal",
      cuerpo: bloques([
        "Ofrecemos bienes y servicios de alta calidad en el ramo metal eléctrico, cumpliendo estándares nacionales que satisfacen a nuestros clientes, mejoran nuestra competitividad y potencializan el crecimiento empresarial sostenible.",
        "Implementar y mantener un sistema de seguridad y salud en el trabajo que proteja a los trabajadores mediante la identificación de peligros, la valoración de riesgos y controles que prevengan accidentes y enfermedades laborales.",
        "Cumplir los requisitos legales aplicables y otros que la organización suscriba voluntariamente.",
        "Prevenir la contaminación ambiental susceptible de generarse por la operación.",
        "Esta política tiene alcance sobre todos los centros de trabajo de la organización. En seguridad y salud en el trabajo cubre a todos los trabajadores, incluyendo contratistas y subcontratistas.",
        "Daniel Gómez Botero — Representante legal",
      ]),
    },
    {
      clave: "tratamiento-datos",
      titulo: "Tratamiento de datos personales",
      intro:
        "Metalúrgica de los Andes S.A.S, como responsable del tratamiento de datos personales, establece directrices para su manejo según la Sección 3, artículo 2.2.2.25.3.1 del Decreto 1074 de 2015.",
      cuerpo: bloques([
        "Los lineamientos aplican a todas las bases de datos personales de la organización conformadas en virtud de sus relaciones comerciales.",
        "Puedes consultar y descargar el documento completo en el archivo adjunto.",
      ]),
      documento: pdfDatos,
    },
    {
      clave: "pqr",
      titulo: "Peticiones, quejas y reclamos",
      tarjetas: [
        { _key: "p1", titulo: "Descarga el formato", texto: "Usa el formato de reporte de PQR para que quede registrada toda la información que necesitamos para atenderte." },
        { _key: "p2", titulo: "Diligéncialo", texto: "Describe la petición, queja o reclamo e incluye tus datos de contacto para poder responderte." },
        { _key: "p3", titulo: "Envíalo", texto: "Remítelo al correo de calidad o entrégalo personalmente en nuestras instalaciones en Medellín." },
      ],
      intro:
        "Buscamos una comunicación fluida y eficaz con clientes y demás grupos de interés para la recepción y atención de sugerencias, peticiones, quejas y reclamos.",
      cuerpo: bloques([
        "Descarga el formato de reporte de PQR, diligéncialo con la descripción y tus datos de contacto, y envíalo al correo de calidad o entrégalo personalmente en nuestras instalaciones en Medellín.",
        "Si tu petición se relaciona con el tratamiento de tus datos personales, utiliza este mismo formato.",
      ]),
      documento: formatoPqr,
    },
    {
      clave: "trabaja-con-nosotros",
      titulo: "Trabaja con nosotros",
      tarjetas: [
        { _key: "r1", titulo: "Oficio real", texto: "Ingeniería, diseño mecánico y eléctrico, carpintería metálica, ensamble y pruebas: se aprende haciendo, sobre producto que sale a campo." },
        { _key: "r2", titulo: "Seguridad primero", texto: "Sistema de Gestión de Seguridad y Salud en el Trabajo certificado bajo ISO 45001:2018, auditado por un organismo acreditado ante la ONAC." },
        { _key: "r3", titulo: "Estabilidad", texto: "Fundada en 1960. Seis décadas de operación continua en el sector eléctrico colombiano." },
      ],
      lista: [
        "Ingeniería y diseño eléctrico",
        "Diseño mecánico",
        "Carpintería metálica",
        "Ensamble y cableado",
        "Pruebas y calidad",
        "Mantenimiento en sitio",
        "Logística y despacho",
        "Comercial y servicio posventa",
      ],
      intro:
        "Somos una compañía colombiana con más de 65 años fabricando soluciones metal eléctricas desde Medellín. Buscamos personas técnicas y rigurosas.",
      cuerpo: bloques([
        "Envíanos tu hoja de vida indicando en el asunto el área de tu interés. Revisamos todas las postulaciones y te contactamos si tu perfil corresponde a una vacante abierta.",
      ]),
    },
  ];

  for (const p of PAGINAS) {
    await client.createOrReplace({ _id: `politica-${p.clave}`, _type: "politica", ...p });
    console.log(`  ✓ ${p.titulo}`);
  }

  console.log("\nListo.");
}

main().catch((e) => {
  console.error("\nError:", e.message);
  process.exit(1);
});
