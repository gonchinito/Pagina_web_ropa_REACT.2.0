import { createContext, useContext, useEffect, useState } from "react";
import { leerStorage, guardarStorage } from "../data/storage";

const CLAVE_CARRITO = "noir_carrito";

const CartContext = createContext(null);

// ============================================================
// CartProvider
// Carrito de compras persistido en LocalStorage.
// Cubre agregar, leer, cambiar cantidad (update) y quitar (delete).
// (IA: refactor sugerido por Claude para mover la lógica de
// carrito.js original a un Context de React con hooks)
// ============================================================
export function CartProvider({ children }) {
  const [items, setItems] = useState(() => leerStorage(CLAVE_CARRITO, []));
  const [panelAbierto, setPanelAbierto] = useState(false);

  useEffect(() => {
    guardarStorage(CLAVE_CARRITO, items);
  }, [items]);

  function agregarAlCarrito(producto) {
    setItems((prev) => {
      const existente = prev.find((item) => item.id === producto.id);
      if (existente) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          imagen: producto.imagen,
          cantidad: 1,
        },
      ];
    });
    setPanelAbierto(true);
  }

  function cambiarCantidad(id, delta) {
    setItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, cantidad: item.cantidad + delta } : item))
        .filter((item) => item.cantidad > 0)
    );
  }

  function eliminarDelCarrito(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function vaciarCarrito() {
    setItems([]);
  }

  const total = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  const totalItems = items.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        totalItems,
        panelAbierto,
        setPanelAbierto,
        agregarAlCarrito,
        cambiarCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
