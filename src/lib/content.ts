/* ============================================================
   Contenido Metalandes — datos reales del sitio metalandes.net
   ============================================================ */

/* Los certificados se importan como assets, no desde /public: así no quedan
   expuestos en una URL directa y sólo se sirven optimizados por next/image.
   Los PDF originales no se publican — los certificados son de consulta, no
   de descarga. */
import iso9001 from "@/assets/certificados/iso-9001.jpg";
import iso14001 from "@/assets/certificados/iso-14001.jpg";
import iso45001 from "@/assets/certificados/iso-45001.jpg";
import retie0307 from "@/assets/certificados/retie-0307.png";
import retie0308 from "@/assets/certificados/retie-0308.png";
import retie0309 from "@/assets/certificados/retie-0309.png";
import retie0310 from "@/assets/certificados/retie-0310.png";

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const NAV: NavItem[] = [
  {
    label: "Empresa",
    href: "/empresa",
    children: [
      { label: "Gestión integral", href: "/empresa/gestion-integral" },
      { label: "Certificaciones", href: "/empresa/certificaciones" },
      { label: "Tratamiento de datos", href: "/empresa/tratamiento-datos" },
      { label: "PQR", href: "/pqr" },
    ],
  },
  {
    label: "Servicios",
    href: "/servicios",
    children: [
      { label: "Mantenimiento", href: "/servicios/mantenimiento" },
    ],
  },
  {
    label: "Productos",
    href: "/productos",
    children: [
      { label: "Subestaciones media tensión", href: "/productos/media-tension" },
      { label: "Subestaciones baja tensión", href: "/productos/baja-tension" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Trabaja con nosotros", href: "/trabaja-con-nosotros" },
  { label: "Contacto", href: "/contacto" },
];

/* --- Landing --- */
export const SERVICES = [
  {
    n: "01",
    title: "Mantenimiento",
    desc: "Servicio de mantenimiento en media y baja tensión, certificado ISO 45001, 24/7 en todo el territorio nacional.",
    tags: ["Media tensión", "Baja tensión", "24/7"],
    img: "/img/mantenimiento.jpg" as string | null,
    href: "/servicios/mantenimiento",
  },
  {
    n: "02",
    title: "Subestaciones",
    desc: "Fabricación de subestaciones eléctricas, tableros y gabinetes de media y baja tensión con certificación RETIE.",
    tags: ["Tablerista", "RETIE", "A la medida"],
    img: "/img/subestaciones.jpg",
    href: "/productos",
  },
] as const;

export const PRODUCTS = [
  { title: "Celdas de media tensión", spec: "13.2 kV – 34.5 kV · RETIE" },
  { title: "Tableros de baja tensión", spec: "Auto soportados / adosables" },
  { title: "Envolventes y gabinetes", spec: "Uso interior y exterior" },
  { title: "Transferencias automáticas", spec: "Baja y media tensión" },
  { title: "Estructuras metálicas", spec: "Cold Rolled · Galvanizado · Inox" },
] as const;

export const STATS = [
  { value: 1960, suffix: "", label: "Fundada en" },
  { value: 65, suffix: "+", label: "Años de trayectoria" },
  { value: 24, suffix: "/7", label: "Línea de mantenimiento" },
  { value: 7, suffix: "", label: "Certificaciones ISO / RETIE" },
] as const;

/* --- Empresa --- */
export const EMPRESA = {
  intro:
    "Metalandes S.A.S es una empresa colombiana que produce bienes y servicios en el ramo metal eléctrico para atender las necesidades crecientes del mercado colombiano e internacional. Fundada en 1960, es líder en los sectores tablerista y de mantenimiento eléctrico.",
  fortaleza:
    "Ofrecemos soluciones de manera integral: departamento técnico-comercial, ingeniería, diseño mecánico y eléctrico, carpintería metálica, ensamble, pruebas, logística de despacho y servicio posventa.",
  gestion: {
    title: "Gestión integral",
    lead: "Política del Sistema Integrado de Gestión",
    body: "Ofrecemos bienes y servicios de alta calidad en el ramo metal eléctrico, cumpliendo estándares nacionales que satisfacen a nuestros clientes, mejoran nuestra competitividad y potencializan el crecimiento empresarial sostenible.",
    points: [
      "Sistema de seguridad y salud en el trabajo: identificación de peligros, valoración de riesgos y controles que previenen accidentes y enfermedades laborales.",
      "Cumplimiento de requisitos legales aplicables y otros suscritos voluntariamente.",
      "Prevención de la contaminación ambiental y mejora continua de los procesos.",
      "Consulta y participación de los interesados.",
    ],
    /* Nota de alcance y firma tal como los publica la empresa. */
    alcance:
      "Esta política tiene alcance sobre todos los centros de trabajo de la organización, en caso de que se habiliten sedes. En términos de seguridad y salud en el trabajo, su alcance cubre a todos los trabajadores independientemente de su forma de contratación y vinculación, incluyendo contratistas y subcontratistas.",
    firma: { nombre: "Daniel Gómez Botero", cargo: "Representante legal" },
    pilares: [
      {
        title: "Gestión de la calidad",
        body: "La gestión de la calidad es la herramienta que garantiza que los bienes y servicios ofrecidos a nuestros clientes satisfacen sus necesidades. Se aplican cuatro componentes básicos: planeación, control, aseguramiento y mejora en la calidad de procesos, materias primas, insumos y recursos físicos y humanos.",
      },
      {
        title: "Seguridad y salud en el trabajo",
        body: "Metalandes S.A.S está comprometida con la calidad de vida laboral de su equipo. Los principales riesgos de nuestra actividad son la exposición a tensión eléctrica, posturas prolongadas y manejo de cargas, ruido, golpes y caídas. La estrategia de gestión previene accidentes y enfermedades laborales mediante programas de gestión de riesgos y vigilancia epidemiológica.",
      },
      {
        title: "Gestión ambiental",
        body: "Controlamos aspectos ambientales como el uso y consumo de agua, el consumo de energía y la generación de residuos, con acciones de prevención y mitigación, campañas de sensibilización y mejora continua del desempeño ambiental.",
      },
    ],
    raee: "Cuando las subestaciones eléctricas de media o baja tensión que hemos suministrado cumplan su vida útil, deben entregarse a una empresa especializada en el manejo de residuos de aparatos eléctricos y electrónicos, con licencia ambiental vigente, que separe los materiales para que las piezas aprovechables se reincorporen a los procesos productivos y las no aprovechables se destruyan adecuadamente.",
  },
  certificaciones: {
    title: "Certificaciones",
    lead: "Certificaciones obtenidas",
    iso: [
      {
        code: "ISO 9001:2015",
        name: "Sistema de Gestión de la Calidad",
        issuer: "Kiwa CQR SAS",
        validez: "Vigente hasta agosto 2027",
        img: iso9001,
      },
      {
        code: "ISO 14001:2015",
        name: "Sistema de Gestión Ambiental",
        issuer: "Kiwa CQR SAS",
        validez: "Vigente hasta febrero 2027",
        img: iso14001,
      },
      {
        code: "ISO 45001:2018",
        name: "Seguridad y Salud en el Trabajo",
        issuer: "Kiwa CQR SAS",
        validez: "Vigente hasta febrero 2027",
        img: iso45001,
      },
    ],
    retie: [
      {
        code: "Cert. 0307",
        name: "Envolventes vacías / tableros auto soportados",
        issuer: "Certicheck S.A.S · Esquema 5 RETIE",
        validez: "Vigente hasta diciembre 2030",
        img: retie0307,
      },
      {
        code: "Cert. 0308",
        name: "Tableros de baja tensión",
        issuer: "Certicheck S.A.S · Esquema 5 RETIE",
        validez: "Vigente hasta diciembre 2030",
        img: retie0308,
      },
      {
        code: "Cert. 0309",
        name: "Celdas de media tensión",
        issuer: "Certicheck S.A.S · Esquema 5 RETIE",
        validez: "Vigente hasta diciembre 2030",
        img: retie0309,
      },
      {
        code: "Cert. 0310",
        name: "Tableros de transferencias automáticas de carga",
        issuer: "Certicheck S.A.S · Esquema 5 RETIE",
        validez: "Vigente hasta diciembre 2030",
        img: retie0310,
      },
    ],
  },
  datos: {
    title: "Tratamiento de datos",
    body: "Metalúrgica de los Andes S.A.S, como responsable del tratamiento de ciertos datos personales para el normal desarrollo de su actividad económica y en el marco de la relación que la vincula con clientes, proveedores, contratistas y demás personas relacionadas con las actividades industriales y comerciales, manifiesta su compromiso de establecer directrices para el manejo de datos personales según lo requerido en la Sección 3, artículo 2.2.2.25.3.1 del Decreto 1074 de 2015.",
    /* Documento oficial PE-DB-006 Rev. 4 (26/08/2025), publicado por la empresa. */
    pdf: "/documentos/politica-tratamiento-datos.pdf",
    pdfLabel: "Política de Tratamiento de Datos Personales",
  },
};

/* --- PQR — peticiones, quejas y reclamos --- */
export const PQR = {
  lead: "Peticiones, quejas y reclamos",
  intro:
    "Buscamos una comunicación fluida y eficaz con clientes y demás grupos de interés para la recepción y atención de sugerencias, peticiones, quejas y reclamos. Puedes comunicarte por correo electrónico, por teléfono, por correspondencia o personalmente en nuestras instalaciones.",
  email: "calidad@metalandes.com",
  /* Formato oficial que la empresa publica para radicar la PQR. */
  formato: "/documentos/formulario-pqr.xlsx",
  formatoLabel: "Formato de reporte de PQR (Excel)",
  pasos: [
    {
      n: "01",
      title: "Descarga el formato",
      desc: "Usa el formato de reporte de PQR para que quede registrada toda la información que necesitamos para atenderte.",
    },
    {
      n: "02",
      title: "Diligéncialo",
      desc: "Describe la petición, queja o reclamo e incluye tus datos de contacto para poder responderte.",
    },
    {
      n: "03",
      title: "Envíalo",
      desc: "Remítelo al correo de calidad o entrégalo personalmente en nuestras instalaciones en Medellín.",
    },
  ],
  datosPersonales:
    "Si tu petición, queja o reclamo se relaciona con el tratamiento de tus datos personales, utiliza este mismo formato y envíalo al correo de calidad o entrégalo personalmente en las instalaciones de la empresa.",
};

/* --- Servicios --- */
export const SERVICIOS_PAGE = {
  mantenimiento: {
    title: "Mantenimiento — asistencia técnica",
    body: "Servicio de mantenimiento para media y baja tensión certificado ISO 45001:2018, con impecable cumplimiento de salud y seguridad en el trabajo. Operamos 24 horas, 7 días a la semana en todo el territorio nacional.",
    emergencia: "310 668 2128",
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
};

/* --- Productos --- */

/**
 * Producto del catálogo de una subestación.
 *
 * Pensado para que el módulo de edición lo administre sin tocar código: se
 * pueden agregar, quitar, reordenar y renombrar ítems, y cargarles foto.
 * - `id` es estable y no debe cambiar aunque se renombre el producto: es lo
 *   que permitirá referenciarlo (foto asociada, orden, enlace) sin romper nada.
 * - `img: null` significa "sin foto todavía": la tarjeta reserva el espacio y
 *   muestra un marcador neutro hasta que se cargue la imagen.
 * - `desc` es opcional; hoy solo se usa para desplegar siglas.
 */
export type ProductoItem = {
  id: string;
  title: string;
  desc?: string;
  img?: string | null;
};

export const PRODUCTOS_PAGE = {
  intro:
    "Somos fabricantes de subestaciones eléctricas de media y baja tensión, con amplia oferta de tableros y gabinetes para uso interior y exterior, ajustados a la medida del cliente. Certificación RETIE.",
  media: {
    title: "Subestaciones de media tensión",
    body: "Celdas de media tensión de 13.2 kV a 34.5 kV. Diseño y fabricación bajo norma, con certificación RETIE y certificado 0309.",
    specs: [
      "Rango 13.2 kV – 34.5 kV",
      "Celdas certificadas (Cert. 0309)",
      "Uso interior y exterior",
      "Diseño a la medida",
    ],
    img: "/img/subestaciones.jpg",
    catalogoTitle: "Gabinetes de media tensión",
    catalogo: [
      { id: "celdas-transformador", title: "Celdas de transformador", img: null },
      { id: "medida-condensada", title: "Medida condensada", img: null },
      { id: "seccionador", title: "Seccionador", img: null },
      { id: "switchgear", title: "Switchgear", img: null },
    ] as ProductoItem[],
  },
  baja: {
    title: "Subestaciones de baja tensión",
    body: "Tableros y gabinetes de baja tensión fabricados en lámina Cold Rolled, galvanizada o acero inoxidable. Acabado en pintura en polvo RAL 7032 y tratamiento de superficie de 5 pasos.",
    specs: [
      "Lámina Cold Rolled / Galvanizada / Inox",
      "Pintura en polvo RAL 7032",
      "Fosfatizado en zinc de 5 pasos",
      "Certificación RETIE (Cert. 0308)",
    ],
    img: "/img/mantenimiento.jpg",
    catalogoTitle: "Tableros y equipos de baja tensión",
    catalogo: [
      { id: "banco-capacitores", title: "Banco de capacitores", img: null },
      { id: "bombeos-480", title: "Bombeos de 480 V", img: null },
      { id: "ccm", title: "CCM", desc: "Centro de control de motores", img: null },
      { id: "tablero-agrupador", title: "Tablero agrupador", img: null },
      { id: "tablero-rack", title: "Tablero rack", img: null },
      { id: "tablero-intemperie", title: "Tableros tipo intemperie", img: null },
      { id: "racks-distribucion", title: "Racks y distribución", img: null },
    ] as ProductoItem[],
  },
};

/* --- Trabaja con nosotros --- */
export const TRABAJO = {
  intro:
    "Somos una compañía colombiana con más de 65 años fabricando soluciones metal eléctricas desde Medellín. Buscamos personas técnicas y rigurosas que quieran construir infraestructura eléctrica que el país usa todos los días.",
  razones: [
    {
      title: "Oficio real",
      desc: "Ingeniería, diseño mecánico y eléctrico, carpintería metálica, ensamble y pruebas: se aprende haciendo, sobre producto que sale a campo.",
    },
    {
      title: "Seguridad primero",
      desc: "Sistema de Gestión de Seguridad y Salud en el Trabajo certificado bajo ISO 45001:2018, auditado por un organismo acreditado ante la ONAC.",
    },
    {
      title: "Estabilidad",
      desc: "Fundada en 1960. Seis décadas de operación continua en el sector eléctrico colombiano.",
    },
  ],
  areas: [
    "Ingeniería y diseño eléctrico",
    "Diseño mecánico",
    "Carpintería metálica",
    "Ensamble y cableado",
    "Pruebas y calidad",
    "Mantenimiento en sitio",
    "Logística y despacho",
    "Comercial y servicio posventa",
  ],
  comoAplicar:
    "Envíanos tu hoja de vida indicando en el asunto el área de tu interés. Revisamos todas las postulaciones y te contactamos si tu perfil corresponde a una vacante abierta.",
};

/* --- Blog --- */
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
};

/**
 * Entradas del blog. Vacío por ahora: la página muestra su estado inicial
 * hasta que se publique el primer artículo.
 */
export const POSTS: Post[] = [];

export const BLOG = {
  intro:
    "Notas técnicas sobre subestaciones, normativa RETIE, mantenimiento eléctrico y buenas prácticas de la industria metal eléctrica colombiana.",
};

/* --- Contacto --- */
export const CONTACT = {
  address: "Cra. 53 No. 29 C 73, Medellín, Colombia",
  phone: "(57) 604 444 6153",
  phoneHref: "+576044446153",
  whatsapp: "+57 324 351 5023",
  whatsappHref: "573243515023",
  waLink: "https://wa.me/573243515023",
  email: "info@metalandes.com",
  emergencia: "310 668 2128",
  emergenciaHref: "+573106682128",
  extensiones: [
    { area: "Mantenimiento y servicios", ext: "119 · 219" },
    { area: "Equipo comercial", ext: "104 · 110 · 114 · 124 · 125 · 126" },
    { area: "Almacén", ext: "102" },
    { area: "Compras", ext: "109" },
  ],
  webmail: "http://webmail.metalandes.com/",
  instagram: "https://www.instagram.com/metalandes/",
  facebook: "https://www.facebook.com/metalandes.sas",
  youtube: "http://youtube.com/metalandes",
  linkedin: "https://www.linkedin.com/company/metalandes-sas/",
};
