import { useEffect, useState } from "react";

// ============================================================
// TrendingSection
// Consume la API pública FakeStoreAPI (https://fakestoreapi.com)
// para mostrar referencias internacionales de moda/ropa.
// Cumple el criterio: consumo de datos con Fetch + Async/Await
// + manejo robusto de errores (loading / error / datos vacíos).
// (IA: estructura de los tres estados -loading, error, data-
// sugerida por Claude como buena práctica estándar en React)
// ============================================================
export default function TrendingSection() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let activo = true; // evita actualizar estado si el componente se desmontó

    async function cargarTendencias() {
      setCargando(true);
      setError(null);
      try {
        const respuesta = await fetch("https://fakestoreapi.com/products/category/men's clothing?limit=4");

        if (!respuesta.ok) {
          throw new Error(`Error del servidor: ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        if (activo) {
          setProductos(datos);
        }
      } catch (err) {
        if (activo) {
          setError("No se pudieron cargar las tendencias internacionales. Intenta más tarde.");
          console.error("Error consumiendo FakeStoreAPI:", err);
        }
      } finally {
        if (activo) setCargando(false);
      }
    }

    cargarTendencias();

    return () => {
      activo = false;
    };
  }, []);

  return (
    <section className="section" id="tendencias">
      <div className="section-top">
        <div>
          <p className="section-eyebrow">// REFERENCIAS GLOBALES</p>
          <h2 className="section-title">
            TENDENCIAS
            <br />
            INTERNACIONALES
          </h2>
        </div>
        <p className="section-desc">
          Lo que se está moviendo afuera, vía API pública en vivo.
        </p>
      </div>

      {cargando && <p className="producto-cargando">Cargando tendencias…</p>}

      {error && <p className="trending-error">⚠ {error}</p>}

      {!cargando && !error && (
        <div className="trending-grid">
          {productos.map((p) => (
            <a
              key={p.id}
              href={p.image}
              target="_blank"
              rel="noopener noreferrer"
              className="trending-card"
            >
              <img src={p.image} alt={p.title} />
              <p className="trending-titulo">{p.title}</p>
              <p className="trending-precio">USD ${p.price}</p>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
