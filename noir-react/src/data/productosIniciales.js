// ============================================================
// Datos semilla de productos.
// Se cargan en LocalStorage solo la primera vez que se abre la app.
// Desde ahí en adelante, el CRUD del panel de Admin manda.
// (IA: GPT/Claude se usó para sugerir esta estructura de objeto
// producto -> id, nombre, precio, categoria, imagen, stock, badge)
// ============================================================

export const productosIniciales = [
  {
    id: 1,
    nombre: "Oversize Jacket",
    precio: 36900,
    categoria: "OUTERWEAR",
    imagen: "/img/Oversize_jacket.png",
    stock: "En stock",
    badge: "NUEVO",
    descripcion: "Tallas XS — XL · 100% Algodón pesado",
  },
  {
    id: 2,
    nombre: "Cargo Pants",
    precio: 35900,
    categoria: "PANTALONES",
    imagen: "/img/Cargo_pants.png",
    stock: "En stock",
    badge: "HOT",
    descripcion: "Tallas S — XXL · Ripstop premium",
  },
  {
    id: 3,
    nombre: "Hoodie Técnico",
    precio: 22000,
    categoria: "TOPS",
    imagen: "/img/Hoodie_tecnico.png",
    stock: "En stock",
    badge: "",
    descripcion: "Tallas XS — XL · Fleece interior",
  },
  {
    id: 4,
    nombre: "Tee Gráfica SS26",
    precio: 34900,
    categoria: "TOPS",
    imagen: "/img/TEE_grafica.png",
    stock: "Últimas unidades",
    badge: "-20%",
    descripcion: "Tallas XS — XXL · Jersey 220g",
  },
  {
    id: 5,
    nombre: "Bomber Reflectivo",
    precio: 28000,
    categoria: "OUTERWEAR",
    imagen: "/img/Bomber_reflectivo.png",
    stock: "Pocas unidades",
    badge: "EXCLUSIVO",
    descripcion: "Tallas S — XL · Material reflectivo 3M",
  },
  {
    id: 6,
    nombre: "Shorts Técnicos",
    precio: 19900,
    categoria: "PANTALONES",
    imagen: "/img/Short_tecnicos.png",
    stock: "En stock",
    badge: "",
    descripcion: "Tallas S — XXL · Quick-dry",
  },
];
