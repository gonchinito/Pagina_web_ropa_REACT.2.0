import Hero from "../components/Hero";
import Ticker from "../components/Ticker";
import ProductGrid from "../components/ProductGrid";
import CollectionBanner from "../components/CollectionBanner";
import PacksSection from "../components/PacksSection";
import TrendingSection from "../components/TrendingSection";
import ContactForm from "../components/ContactForm";
import Newsletter from "../components/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <ProductGrid />
      <CollectionBanner />
      <PacksSection />
      <TrendingSection />

      <section className="section section-dark" id="contacto">
        <div className="contacto-inner">
          <div className="contacto-left">
            <p className="section-eyebrow">// CONTACTO</p>
            <h2 className="section-title light">HABLEMOS</h2>
            <p className="contacto-desc">
              ¿Tienes dudas sobre tallas, envíos o colaboraciones? Escríbenos.
            </p>
            <div className="contacto-datos">
              <p>✉ hola@noir-store.cl</p>
              <p>📍 Santiago, Chile</p>
              <p>⏱ Resp. en menos de 24h</p>
            </div>
          </div>
          <div className="contacto-right">
            <ContactForm />
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
