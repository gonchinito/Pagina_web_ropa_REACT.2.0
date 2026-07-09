import { useState } from "react";
import { useProducts } from "../context/ProductsContext";
import ProductCard from "./ProductCard";
import Lightbox from "./Lightbox";

export default function ProductGrid() {
  const { productos, cargando } = useProducts();
  const [imagenActiva, setImagenActiva] = useState(null);

  return (
    <section className="section" id="productos">
      <div className="section-top">
        <div>
          <p className="section-eyebrow">// CATÁLOGO</p>
          <h2 className="section-title">
            LO MÁS
            <br />
            VENDIDO
          </h2>
        </div>
        <p className="section-desc">Piezas que no pasan de moda. Cada prenda, una declaración.</p>
      </div>

      {cargando ? (
        <p className="producto-cargando">Cargando catálogo…</p>
      ) : (
        <div className="productos-grid">
          {productos.map((producto) => (
            <ProductCard key={producto.id} producto={producto} onVerImagen={setImagenActiva} />
          ))}
        </div>
      )}

      {imagenActiva && (
        <Lightbox
          src={imagenActiva.imagen}
          nombre={imagenActiva.nombre}
          onClose={() => setImagenActiva(null)}
        />
      )}
    </section>
  );
}
