export default function CollectionBanner() {
  return (
    <section className="coleccion-banner" id="coleccion">
      <div className="banner-text-bg">SS26</div>
      <div className="banner-content">
        <p className="banner-eyebrow">// LOOKBOOK 2026</p>
        <h2>
          COLECCIÓN
          <br />
          <em>URBANA</em>
        </h2>
        <p>
          Inspirada en las calles, diseñada para durar. Cada pieza combina funcionalidad con
          estética contemporánea.
        </p>
        <a href="#productos" className="btn-dark">
          Ver toda la colección
        </a>
      </div>
      <div className="banner-cards">
        <div className="banner-card bc-1">
          <span>🧥</span>
          <p>Outerwear</p>
        </div>
        <div className="banner-card bc-2">
          <span>👖</span>
          <p>Bottoms</p>
        </div>
        <div className="banner-card bc-3">
          <span>👕</span>
          <p>Tops</p>
        </div>
      </div>
    </section>
  );
}
