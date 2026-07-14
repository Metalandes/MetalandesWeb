/* ============================================================
   Contenido Metalandes — datos reales del sitio metalandes.net
   ============================================================ */

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
    ],
  },
  {
    label: "Servicios",
    href: "/servicios",
    children: [
      { label: "Automatización", href: "/servicios/automatizacion" },
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
  { label: "Contacto", href: "/contacto" },
];

/* --- Landing --- */
export const SERVICES = [
  {
    n: "01",
    title: "Automatización",
    desc: "Ingeniería en automatización industrial junto a ELICO GROUP: diseño de procesos, sistemas de control y puesta en marcha.",
    tags: ["Control", "Procesos", "Puesta en marcha"],
    img: null as string | null,
    href: "/servicios/automatizacion",
  },
  {
    n: "02",
    title: "Mantenimiento",
    desc: "Servicio de mantenimiento en media y baja tensión, certificado ISO 45001, 24/7 en todo el territorio nacional.",
    tags: ["Media tensión", "Baja tensión", "24/7"],
    img: "/img/mantenimiento.jpg",
    href: "/servicios/mantenimiento",
  },
  {
    n: "03",
    title: "Subestaciones",
    desc: "Fabricación de subestaciones eléctricas, tableros y gabinetes de media y baja tensión con certificación RETIE 2013.",
    tags: ["Tablerista", "RETIE 2013", "A la medida"],
    img: "/img/subestaciones.jpg",
    href: "/productos",
  },
] as const;

export const PRODUCTS = [
  { title: "Celdas de media tensión", spec: "13.2 kV – 34.5 kV · RETIE 2013" },
  { title: "Tableros de baja tensión", spec: "Auto soportados / adosables" },
  { title: "Envolventes y gabinetes", spec: "Uso interior y exterior" },
  { title: "Transferencias automáticas", spec: "Baja y media tensión" },
  { title: "Estructuras metálicas", spec: "Cold Rolled · Galvanizado · Inox" },
] as const;

export const STATS = [
  { value: 1960, suffix: "", label: "Fundada en" },
  { value: 65, suffix: "+", label: "Años de trayectoria" },
  { value: 24, suffix: "/7", label: "Línea de mantenimiento" },
  { value: 4, suffix: "", label: "Certificaciones ISO / RETIE" },
] as const;

/* --- Empresa --- */
export const EMPRESA = {
  intro:
    "Metalandes S.A.S es una empresa colombiana que produce bienes y servicios en el ramo metal eléctrico para atender las necesidades crecientes del mercado colombiano e internacional. Fundada en 1960, es líder en los sectores tablerista, automatización industrial y mantenimiento eléctrico.",
  fortaleza:
    "Ofrecemos soluciones de manera integral: departamento técnico-comercial, ingeniería, soporte en automatización y sistemas, diseño mecánico y eléctrico, carpintería metálica, ensamble, pruebas, logística de despacho y servicio posventa.",
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
  },
  certificaciones: {
    title: "Certificaciones",
    lead: "Certificaciones obtenidas",
    iso: [
      { code: "ISO 9001:2015", name: "Sistema de Gestión de la Calidad" },
      { code: "ISO 14001:2015", name: "Sistema de Gestión Ambiental" },
      { code: "ISO 45001:2018", name: "Seguridad y Salud en el Trabajo" },
    ],
    retie: [
      { code: "Cert. 0307", name: "Envolventes vacías / tableros auto soportados" },
      { code: "Cert. 0308", name: "Tableros de baja tensión" },
      { code: "Cert. 0309", name: "Celdas de media tensión" },
      { code: "Cert. 0310", name: "Transferencias automáticas de carga" },
    ],
  },
  datos: {
    title: "Tratamiento de datos",
    body: "Metalúrgica de los Andes S.A.S, como responsable del tratamiento de datos personales para el desarrollo de su actividad económica, establece directrices para el manejo de datos según la Sección 3, artículo 2.2.2.25.3.1 del Decreto 1074 de 2015. Ponemos a disposición nuestra Política de Tratamiento de Datos Personales para consulta y descarga.",
  },
};

/* --- Servicios --- */
export const SERVICIOS_PAGE = {
  automatizacion: {
    title: "Automatización industrial",
    body: "A través de nuestra empresa asociada ELICO GROUP S.A.S. ofrecemos servicios de ingeniería en automatización industrial, con infraestructura humana y técnica para dar respuestas tecnológicas a la creciente industria colombiana.",
    flow: [
      "Asesoramiento inicial",
      "Diseño de procesos inteligentes",
      "Desarrollo de sistemas de control",
      "Puesta en marcha y capacitación",
      "Mantenimiento y soporte",
    ],
    sectores: ["Alimenticio", "Cervecero", "Cerámico", "Papelero", "Metalúrgico", "Químico"],
  },
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
export const PRODUCTOS_PAGE = {
  intro:
    "Somos fabricantes de subestaciones eléctricas de media y baja tensión, con amplia oferta de tableros y gabinetes para uso interior y exterior, ajustados a la medida del cliente. Certificación RETIE 2013.",
  media: {
    title: "Subestaciones de media tensión",
    body: "Celdas de media tensión de 13.2 kV a 34.5 kV. Diseño y fabricación bajo norma, con certificación RETIE 2013 y certificado 0309.",
    specs: [
      "Rango 13.2 kV – 34.5 kV",
      "Celdas certificadas (Cert. 0309)",
      "Uso interior y exterior",
      "Diseño a la medida",
    ],
    img: "/img/subestaciones.jpg",
  },
  baja: {
    title: "Subestaciones de baja tensión",
    body: "Tableros y gabinetes de baja tensión fabricados en lámina Cold Rolled, galvanizada o acero inoxidable. Acabado en pintura en polvo RAL 7032 y tratamiento de superficie de 5 pasos.",
    specs: [
      "Lámina Cold Rolled / Galvanizada / Inox",
      "Pintura en polvo RAL 7032",
      "Fosfatizado en zinc de 5 pasos",
      "Certificación RETIE 2013 (Cert. 0308)",
    ],
    img: "/img/mantenimiento.jpg",
  },
};

/* --- Contacto --- */
export const CONTACT = {
  address: "Cra. 53 No. 29 C 73, Medellín, Colombia",
  phone: "(57) 604 444 6153",
  phoneHref: "+576044446153",
  whatsapp: "+57 314 662 1062",
  whatsappHref: "573146621062",
  waLink: "https://wa.link/fx04pk",
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
};
