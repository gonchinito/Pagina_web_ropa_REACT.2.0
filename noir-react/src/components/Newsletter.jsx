import { useState } from "react";

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [estado, setEstado] = useState({ tipo: "", mensaje: "" });

  function manejarSubmit() {
    const valor = email.trim();

    if (!valor) {
      setEstado({ tipo: "error", mensaje: "// ingresa tu correo" });
      return;
    }

    if (!REGEX_EMAIL.test(valor)) {
      setEstado({ tipo: "error", mensaje: "// correo inválido" });
      return;
    }

    setEmail("");
    setEstado({ tipo: "ok", mensaje: "✓ Bienvenido al club. Revisa tu inbox." });
  }

  return (
    <section className="newsletter-section" id="newsletter">
      <div className="newsletter-inner">
        <div className="newsletter-text">
          <p className="section-eyebrow">// NEWSLETTER</p>
          <h2>
            ACCESO
            <br />
            <em>ANTICIPADO</em>
          </h2>
          <p>Drops exclusivos, preventas y un 15% de descuento en tu primera compra.</p>
        </div>
        <div className="newsletter-form">
          <div className="newsletter-input-group">
            <input
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="button" onClick={manejarSubmit}>
              UNIRME
            </button>
          </div>
          <p style={{ color: estado.tipo === "error" ? "#FF3333" : "#E8FF00" }}>
            {estado.mensaje}
          </p>
          <p className="newsletter-legal">Sin spam. Baja cuando quieras.</p>
        </div>
      </div>
    </section>
  );
}
