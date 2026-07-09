import { useCart } from "../context/CartContext";

const PACKS = [
  {
    id: 901,
    nombre: "Pack Street Esencial",
    precio: 45900,
    precioAntes: 50800,
    imagen: "/img/Oversize_jacket.png",
    descripcion: "Oversize Jacket + Cargo Pants. El combo definitivo del streetwear urbano.",
    ahorro: "AHORRA $5K",
  },
  {
    id: 902,
    nombre: "Pack Cozy Urbano",
    precio: 39900,
    precioAntes: 50900,
    imagen: "/img/Hoodie_tecnico.png",
    descripcion: "Hoodie Técnico + Shorts. Para los días en que el comfort manda.",
    ahorro: "AHORRA $11K",
  },
];

export default function PacksSection() {
  const { agregarAlCarrito } = useCart();

  return (
    <section className="section" id="packs">
      <div className="section-top">
        <div>
          <p className="section-eyebrow">// PACKS</p>
          <h2 className="section-title">
            OUTFITS
            <br />
            COMPLETOS
          </h2>
        </div>
        <p className="section-desc">
          Conjuntos pensados para que no tengas que pensar. Ahorra en el proceso.
        </p>
      </div>

      <div className="packs-grid">
        {PACKS.map((pack) => (
          <div className="pack-card" key={pack.id}>
            <div className="pack-img">
              <img src={pack.imagen} alt={pack.nombre} className="pack-foto-unica" />
              <div className="pack-discount">{pack.ahorro}</div>
            </div>
            <div className="pack-info">
              <h3>{pack.nombre}</h3>
              <p>{pack.descripcion}</p>
              <div className="pack-footer">
                <div>
                  <p className="pack-precio">${pack.precio.toLocaleString("es-CL")}</p>
                  <p className="pack-antes">
                    <del>${pack.precioAntes.toLocaleString("es-CL")}</del> · 2 piezas
                  </p>
                </div>
                <button className="btn-pack" onClick={() => agregarAlCarrito(pack)}>
                  Añadir →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
