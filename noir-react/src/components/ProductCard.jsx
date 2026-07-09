import PropTypes from "prop-types";
import { useCart } from "../context/CartContext";

// Componente puro y reutilizable: recibe el producto y dos callbacks opcionales.
// Se usa tanto en el catálogo público como podría reusarse en otras vistas.
export default function ProductCard({ producto, onVerImagen }) {
  const { agregarAlCarrito } = useCart();

  const badgeClase = producto.badge?.includes("%")
    ? "producto-badge badge-sale"
    : producto.badge === "HOT"
    ? "producto-badge badge-hot"
    : "producto-badge";

  return (
    <div className="producto-card">
      <div className="producto-img">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="producto-foto"
          onClick={() => onVerImagen?.(producto)}
        />
        {producto.badge && <div className={badgeClase}>{producto.badge}</div>}
        <div className="producto-hover-info">
          <p>{producto.descripcion}</p>
        </div>
      </div>
      <div className="producto-info">
        <div className="producto-meta">
          <span className="producto-cat">{producto.categoria}</span>
          <span className="producto-stock">● {producto.stock}</span>
        </div>
        <h3>{producto.nombre}</h3>
        <div className="producto-footer">
          <span className="producto-precio">${producto.precio.toLocaleString("es-CL")}</span>
          <button className="btn-add" onClick={() => agregarAlCarrito(producto)}>
            +
          </button>
        </div>
      </div>
    </div>
  );
}

// Type-safety en tiempo de desarrollo: si falta un campo o llega con
// el tipo equivocado, React tira un warning claro en la consola.
ProductCard.propTypes = {
  producto: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    nombre: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    categoria: PropTypes.string.isRequired,
    imagen: PropTypes.string.isRequired,
    stock: PropTypes.string,
    badge: PropTypes.string,
    descripcion: PropTypes.string,
  }).isRequired,
  onVerImagen: PropTypes.func,
};
