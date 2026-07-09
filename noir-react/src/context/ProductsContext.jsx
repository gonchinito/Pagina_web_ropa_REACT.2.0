import { createContext, useContext, useEffect, useState } from "react";
import { productosIniciales } from "../data/productosIniciales";
import { leerStorage, guardarStorage } from "../data/storage";

const CLAVE_PRODUCTOS = "noir_productos";

const ProductsContext = createContext(null);

// ============================================================
// ProductsProvider
// Implementa el CRUD completo de productos sobre LocalStorage:
//   - Create  -> crearProducto
//   - Read    -> productos (estado expuesto)
//   - Update  -> actualizarProducto
//   - Delete  -> eliminarProducto
// Cada operación valida datos antes de tocar el storage.
// ============================================================
export function ProductsProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Carga inicial: si no hay nada en LocalStorage, siembra con los datos iniciales
  useEffect(() => {
    const guardados = leerStorage(CLAVE_PRODUCTOS, null);
    if (guardados && Array.isArray(guardados) && guardados.length > 0) {
      setProductos(guardados);
    } else {
      setProductos(productosIniciales);
      guardarStorage(CLAVE_PRODUCTOS, productosIniciales);
    }
    setCargando(false);
  }, []);

  // Sincroniza cualquier cambio de productos hacia LocalStorage
  useEffect(() => {
    if (!cargando) {
      guardarStorage(CLAVE_PRODUCTOS, productos);
    }
  }, [productos, cargando]);

  // ----- CREATE -----
  function crearProducto(datos) {
    const errores = validarProducto(datos);
    if (errores.length > 0) return { ok: false, errores };

    const nuevo = {
      id: Date.now(),
      nombre: datos.nombre.trim(),
      precio: Number(datos.precio),
      categoria: datos.categoria.trim().toUpperCase(),
      imagen: datos.imagen?.trim() || "/img/Oversize_jacket.png",
      stock: datos.stock?.trim() || "En stock",
      badge: datos.badge?.trim() || "",
      descripcion: datos.descripcion?.trim() || "",
    };

    setProductos((prev) => [...prev, nuevo]);
    return { ok: true, producto: nuevo };
  }

  // ----- UPDATE -----
  function actualizarProducto(id, datos) {
    const errores = validarProducto(datos);
    if (errores.length > 0) return { ok: false, errores };

    setProductos((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              nombre: datos.nombre.trim(),
              precio: Number(datos.precio),
              categoria: datos.categoria.trim().toUpperCase(),
              imagen: datos.imagen?.trim() || p.imagen,
              stock: datos.stock?.trim() || p.stock,
              badge: datos.badge?.trim() || "",
              descripcion: datos.descripcion?.trim() || "",
            }
          : p
      )
    );
    return { ok: true };
  }

  // ----- DELETE -----
  // Devuelve { ok, error } igual que crearProducto/actualizarProducto,
  // para mantener consistencia en toda la API del CRUD.
  function eliminarProducto(id) {
    const existe = productos.some((p) => p.id === id);
    if (!existe) {
      return { ok: false, error: "El producto no existe o ya fue eliminado." };
    }
    setProductos((prev) => prev.filter((p) => p.id !== id));
    return { ok: true };
  }

  // ----- READ de un solo producto -----
  function obtenerProducto(id) {
    return productos.find((p) => p.id === id) || null;
  }

  return (
    <ProductsContext.Provider
      value={{
        productos,
        cargando,
        crearProducto,
        actualizarProducto,
        eliminarProducto,
        obtenerProducto,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

// Validación simple y reutilizable (criterio "implementa componentes seguros")
function validarProducto(datos) {
  const errores = [];
  if (!datos.nombre || !datos.nombre.trim()) errores.push("El nombre es obligatorio.");
  if (!datos.precio || Number(datos.precio) <= 0)
    errores.push("El precio debe ser un número mayor a 0.");
  if (!datos.categoria || !datos.categoria.trim()) errores.push("La categoría es obligatoria.");
  return errores;
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts debe usarse dentro de <ProductsProvider>");
  return ctx;
}
