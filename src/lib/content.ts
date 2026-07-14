export const NAV = [
  { id: "empresa", label: "Empresa" },
  { id: "servicios", label: "Servicios" },
  { id: "productos", label: "Productos" },
  { id: "contacto", label: "Contacto" },
] as const;

export const SERVICES = [
  {
    n: "01",
    title: "Subestaciones",
    desc: "Diseño, fabricación y montaje de subestaciones eléctricas de media y alta tensión, a la medida de cada proyecto.",
    tags: ["Media tensión", "Alta tensión", "Llave en mano"],
    img: "/img/subestaciones.jpg",
  },
  {
    n: "02",
    title: "Mantenimiento",
    desc: "Mantenimiento predictivo, preventivo y correctivo que asegura continuidad y vida útil de la infraestructura eléctrica.",
    tags: ["Predictivo", "Preventivo", "24/7"],
    img: "/img/mantenimiento.jpg",
  },
  {
    n: "03",
    title: "Ingeniería",
    desc: "Estudios, diseño eléctrico y acompañamiento técnico que traducen los requerimientos del cliente en soluciones confiables.",
    tags: ["Diseño", "Estudios", "Consultoría"],
    img: null,
  },
] as const;

export const PRODUCTS = [
  { title: "Tableros de distribución", spec: "Baja / media tensión" },
  { title: "Celdas de media tensión", spec: "Aisladas en aire / gas" },
  { title: "Estructuras metálicas", spec: "Galvanizado en caliente" },
  { title: "Transformadores", spec: "Integración y montaje" },
  { title: "Sistemas de puesta a tierra", spec: "Protección y seguridad" },
] as const;

export const STATS = [
  { value: 65, suffix: "+", label: "Años de trayectoria" },
  { value: 1200, suffix: "+", label: "Proyectos entregados" },
  { value: 32, suffix: "", label: "Departamentos con cobertura" },
  { value: 99, suffix: "%", label: "Continuidad operativa" },
] as const;

export const CONTACT = {
  address: "Cra. 53 No. 29 C 73, Medellín, Colombia",
  phone: "(57) 604 444 6153",
  phoneHref: "+576044446153",
  whatsapp: "+57 300 267 3795",
  whatsappHref: "573002673795",
  email: "info@metalandes.com",
  instagram: "https://instagram.com/metalandes",
  facebook: "https://facebook.com/metalandes",
  youtube: "https://youtube.com/@metalandes",
};
