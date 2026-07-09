import { useCart } from "../context/CartContext";

export default function CartPanel() {
  const {
    items,
    total,
    panelAbierto,
    setPanelAbierto,
    cambiarCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
  } = useCart();

  function finalizarCompra() {
    if (items.length === 0) {
      alert("Tu bag está vacía. Agrega productos para continuar.");
      return;
    }

    let resumen = "╔══ RESUMEN DE COMPRA ══╗\n\n";
    items.forEach((item) => {
      const subtotal = item.precio * item.cantidad;
      resumen += `${item.nombre} x${item.cantidad}\n   $${subtotal.toLocaleString("es-CL")}\n\n`;
    });
    resumen += `────────────────────\nTOTAL: $${total.toLocaleString(
      "es-CL"
    )}\n\n¡Gracias por tu compra en NOIR! 🖤`;

    alert(resumen);
    vaciarCarrito();
    setPanelAbierto(false);
  }

  return (
    <>
      <div className={`carrito-panel ${panelAbierto ? "activo" : ""}`}>
        <div className="carrito-header">
          <span className="carrito-titulo">BAG</span>
          <button className="btn-cerrar" onClick={() => setPanelAbierto(false)}>
            ✕
          </button>
        </div>

        <ul className="lista-carrito">
          {items.map((item) => {
            const subtotal = item.precio * item.cantidad;
            return (
              <li key={item.id} className="carrito-item">
                <div className="carrito-img-wrap">
                  <img src={item.imagen} alt={item.nombre} className="carrito-thumb" />
                </div>
                <div className="carrito-detalles">
                  <strong>{item.nombre}</strong>
                  <p>${item.precio.toLocaleString("es-CL")} c/u</p>
                  <div className="carrito-cantidad">
                    <button className="btn-cantidad" onClick={() => cambiarCantidad(item.id, -1)}>
                      −
                    </button>
                    <span>{item.cantidad}</span>
                    <button className="btn-cantidad" onClick={() => cambiarCantidad(item.id, 1)}>
                      +
                    </button>
                  </div>
                  <p className="carrito-subtotal">
                    Subtotal: ${subtotal.toLocaleString("es-CL")}
                  </p>
                </div>
                <button className="btn-eliminar" onClick={() => eliminarDelCarrito(item.id)}>
                  QUITAR
                </button>
              </li>
            );
          })}
        </ul>

        <div className="carrito-footer">
          <div className="carrito-total-row">
            <span>TOTAL</span>
            <span>${total.toLocaleString("es-CL")}</span>
          </div>
          <button className="btn-finalizar" onClick={finalizarCompra}>
            CHECKOUT →
          </button>
        </div>
      </div>

      <div
        className={`overlay ${panelAbierto ? "activo" : ""}`}
        onClick={() => setPanelAbierto(false)}
      ></div>
    </>
  );
}
