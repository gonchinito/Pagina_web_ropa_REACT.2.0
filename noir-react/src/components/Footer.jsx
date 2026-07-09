export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <p className="footer-logo">NOIR</p>
          <p className="footer-tagline">Moda con actitud. Diseño independiente.</p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <p className="footer-col-title">TIENDA</p>
            <a href="#productos">Productos</a>
            <a href="#coleccion">Colección</a>
            <a href="#packs">Packs</a>
          </div>
          <div className="footer-col">
            <p className="footer-col-title">INFO</p>
            <a href="#contacto">Contacto</a>
            <a href="#">Envíos</a>
            <a href="#">Devoluciones</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 NOIR Store · Santiago, Chile</p>
        <p>Diseño independiente · Envíos a todo el país</p>
      </div>
    </footer>
  );
}
