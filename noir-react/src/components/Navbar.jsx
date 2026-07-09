import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { totalItems, setPanelAbierto } = useCart();

  return (
    <nav>
      <div className="nav-left">
        <span className="nav-tag">SS26</span>
      </div>
      <Link to="/" className="nav-logo">
        NOIR
      </Link>
      <div className="nav-right">
        <ul className="nav-links">
          <li>
            <a href="#productos">Shop</a>
          </li>
          <li>
            <a href="#coleccion">Colección</a>
          </li>
          <li>
            <a href="#contacto">Contacto</a>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        </ul>
        <button className="nav-bag" onClick={() => setPanelAbierto(true)}>
          <span>BAG</span>
          <span className="bag-count">{totalItems}</span>
        </button>
      </div>
    </nav>
  );
}
