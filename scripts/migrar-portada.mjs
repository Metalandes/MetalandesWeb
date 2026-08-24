/**
 * Migra a Sanity el contenido que vivía en los componentes de la portada y en
 * las páginas de servicios, proyectos y productos.
 *
 * Idempotente: _id fijos, reejecutar actualiza sin duplicar.
 *
 *   node scripts/migrar-portada.mjs
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

async function subirImagen(ruta) {
  if (!existsSync(ruta)) return undefined;
  const asset = await client.assets.upload("image", readFileSync(ruta), {
    filename: ruta.split("/").pop(),
  });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

async function main() {
  console.log("Portada");
  await client.createOrReplace({
    _id: "portada",
    _type: "portada",
    heroTitulo: "Energía que",
    heroDestacado: "permanece",
    heroSubtitulo:
      "Diseño, fabricación y mantenimiento de subestaciones eléctricas. Más de 65 años de ingeniería metal eléctrica desde Medellín.",
    heroCta: "Solicitar cotización",
    marquee: [
      "Subestaciones de media y baja tensión",
      "Certificación RETIE",
      "Mantenimiento 24/7",
      "Fabricación a la medida",
    ],
    empresaTitulo: "Más de 65 años",
    empresaDestacado: "energizando Colombia",
    empresaTexto:
      "Metalandes S.A.S es una empresa colombiana que produce bienes y servicios en el ramo metal eléctrico. Fundada en 1960, es líder en los sectores tablerista y de mantenimiento eléctrico.",
    valores: [
      { _key: "v1", titulo: "Compromiso", texto: "Respondemos por cada proyecto de principio a fin." },
      { _key: "v2", titulo: "Confianza", texto: "Relaciones que se sostienen en el tiempo y en resultados." },
      { _key: "v3", titulo: "Innovación", texto: "Ingeniería que evoluciona con la energía del país." },
    ],
    cifras: [
      { _key: "c1", valor: 1960, sufijo: "", etiqueta: "Fundada en" },
      { _key: "c2", valor: 65, sufijo: "+", etiqueta: "Años de trayectoria" },
      { _key: "c3", valor: 24, sufijo: "/7", etiqueta: "Línea de mantenimiento" },
      { _key: "c4", valor: 7, sufijo: "", etiqueta: "Certificaciones ISO / RETIE" },
    ],
    aliadosTitulo: "Nos respaldan",
    aliados: ["EPM", "ISA", "Celsia", "XM", "Air-e", "Enel", "Ecopetrol", "Grupo Argos"],
    tituloServicios: { texto: "Lo que", destacado: "hacemos" },
    tituloProductos: { texto: "Fabricación", destacado: "de precisión" },
    tituloCertificaciones: { texto: "Respaldados por", destacado: "norma" },
    tituloFaq: { texto: "Todo lo que", destacado: "necesitas saber" },
  });
  console.log("  ✓ portada");

  console.log("Navegación");
  await client.createOrReplace({
    _id: "navegacion",
    _type: "navegacion",
    items: [
      {
        _key: "n1",
        label: "Empresa",
        href: "/empresa",
        children: [
          { _key: "c1", label: "Gestión integral", href: "/empresa/gestion-integral" },
          { _key: "c2", label: "Certificaciones", href: "/empresa/certificaciones" },
          { _key: "c3", label: "Tratamiento de datos", href: "/empresa/tratamiento-datos" },
          { _key: "c4", label: "PQR", href: "/pqr" },
        ],
      },
      {
        _key: "n2",
        label: "Servicios",
        href: "/servicios",
        children: [{ _key: "c5", label: "Mantenimiento", href: "/servicios/mantenimiento" }],
      },
      {
        _key: "n3",
        label: "Productos",
        href: "/productos",
        children: [
          { _key: "c6", label: "Subestaciones media tensión", href: "/productos/media-tension" },
          { _key: "c7", label: "Subestaciones baja tensión", href: "/productos/baja-tension" },
        ],
      },
      { _key: "n4", label: "Blog", href: "/blog" },
      { _key: "n5", label: "Trabaja con nosotros", href: "/trabaja-con-nosotros" },
      { _key: "n6", label: "Contacto", href: "/contacto" },
    ],
  });
  console.log("  ✓ navegación");

  console.log("Servicios");
  const SERVICIOS = [
    {
      id: "mantenimiento",
      titulo: "Mantenimiento",
      descripcion:
        "Servicio de mantenimiento en media y baja tensión, certificado ISO 45001, 24/7 en todo el territorio nacional.",
      etiquetas: ["Media tensión", "Baja tensión", "24/7"],
      enlace: "/servicios/mantenimiento",
      img: "public/img/mantenimiento.jpg",
      items: [
        "Transferencias automáticas en baja y media tensión.",
        "Seccionadores en media tensión 13.2 kV – 34.5 kV.",
        "Equipos de corrección de factor de potencia.",
        "Transformadores tipo seco en media tensión hasta 44 kV.",
        "Transformadores en aceite en media tensión hasta 44 kV.",
        "Pruebas a transformadores en media tensión hasta 44 kV.",
        "Análisis físico-químico de aceites dieléctricos.",
        "Medida de parámetros en baja tensión.",
      ],
    },
    {
      id: "subestaciones",
      titulo: "Subestaciones",
      descripcion:
        "Fabricación de subestaciones eléctricas, tableros y gabinetes de media y baja tensión con certificación RETIE.",
      etiquetas: ["Tablerista", "RETIE", "A la medida"],
      enlace: "/productos",
      img: "public/img/subestaciones.jpg",
      items: [],
    },
  ];
  for (const [i, s] of SERVICIOS.entries()) {
    const imagen = await subirImagen(s.img);
    await client.createOrReplace({
      _id: `servicio-${s.id}`,
      _type: "servicio",
      titulo: s.titulo,
      descripcion: s.descripcion,
      etiquetas: s.etiquetas,
      enlace: s.enlace,
      items: s.items,
      imagen,
      orden: (i + 1) * 10,
    });
    console.log(`  ✓ ${s.titulo}`);
  }

  console.log("Proyectos");
  const PROYECTOS = [
    ["Subestación de media tensión", "Antioquia", "2024", "Media tensión"],
    ["Repotenciación de celdas", "Bogotá", "2023", "Media tensión"],
    ["Mantenimiento predictivo anual", "Costa Caribe", "2023", "Mantenimiento"],
    ["Tableros de distribución industrial", "Valle del Cauca", "2022", "Fabricación"],
    ["Banco de capacitores", "Santander", "2022", "Baja tensión"],
    ["Subestación llave en mano", "Meta", "2021", "Baja tensión"],
  ];
  for (const [i, [titulo, lugar, anio, categoria]] of PROYECTOS.entries()) {
    await client.createOrReplace({
      _id: `proyecto-${i + 1}`,
      _type: "proyecto",
      titulo,
      lugar,
      anio,
      categoria,
      orden: (i + 1) * 10,
    });
    console.log(`  ✓ ${titulo}`);
  }

  console.log("Páginas de productos");
  await client.createOrReplace({
    _id: "paginaProductos",
    _type: "paginaProductos",
    intro:
      "Somos fabricantes de subestaciones eléctricas de media y baja tensión, con amplia oferta de tableros y gabinetes para uso interior y exterior, ajustados a la medida del cliente. Certificación RETIE.",
    mediaTitulo: "Subestaciones de media tensión",
    mediaTexto:
      "Celdas de media tensión de 13.2 kV a 34.5 kV. Diseño y fabricación bajo norma, con certificación RETIE y certificado 0309.",
    mediaSpecs: [
      "Rango 13.2 kV – 34.5 kV",
      "Celdas certificadas (Cert. 0309)",
      "Uso interior y exterior",
      "Diseño a la medida",
    ],
    mediaCatalogoTitulo: "Gabinetes de media tensión",
    mediaImagen: await subirImagen("public/img/subestaciones.jpg"),
    bajaTitulo: "Subestaciones de baja tensión",
    bajaTexto:
      "Tableros y gabinetes de baja tensión fabricados en lámina Cold Rolled, galvanizada o acero inoxidable. Acabado en pintura en polvo RAL 7032 y tratamiento de superficie de 5 pasos.",
    bajaSpecs: [
      "Lámina Cold Rolled / Galvanizada / Inox",
      "Pintura en polvo RAL 7032",
      "Fosfatizado en zinc de 5 pasos",
      "Certificación RETIE (Cert. 0308)",
    ],
    bajaCatalogoTitulo: "Tableros y equipos de baja tensión",
    bajaImagen: await subirImagen("public/img/mantenimiento.jpg"),
  });
  console.log("  ✓ páginas de productos");

  console.log("\nListo.");
}

main().catch((e) => {
  console.error("\nError:", e.message);
  process.exit(1);
});
