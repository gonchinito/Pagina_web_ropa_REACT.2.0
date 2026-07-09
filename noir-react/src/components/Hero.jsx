export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg-text">NOIR</div>
      <div className="hero-content">
        <div className="hero-label">
          <span className="dot"></span>
          Nueva Colección 2026
        </div>
        <h1 className="hero-title">
          <span className="line-1">VISTE</span>
          <span className="line-2">
            TU <em>ACTITUD</em>
          </span>
        </h1>
        <p className="hero-sub">
          Piezas que hablan antes que tú. Diseño urbano, calidad sin concesiones.
        </p>
        <div className="hero-actions">
          <a href="#productos" className="btn-dark">
            Explorar tienda
          </a>
          <a href="#coleccion" className="btn-ghost">
            Ver lookbook
          </a>
        </div>
      </div>
      <div className="hero-aside">
        <div className="hero-card-floating">
          <div className="hero-img-wrapper">
            <img src="/img/Oversize_jacket.png" alt="Oversize Jacket" className="hero-foto" />
          </div>
          <div className="hero-card-info">
            <p className="hero-card-label">NUEVO</p>
            <p className="hero-card-name">Oversize Jacket</p>
            <p className="hero-card-price">$36.900</p>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-num">200+</span>
            <span className="stat-label">Piezas</span>
          </div>
          <div className="stat">
            <span className="stat-num">12</span>
            <span className="stat-label">Colecciones</span>
          </div>
          <div className="stat">
            <span className="stat-num">★4.9</span>
            <span className="stat-label">Rating</span>
          </div>
        </div>
      </div>
      <div className="hero-scroll-hint">SCROLL ↓</div>
    </section>
  );
}
