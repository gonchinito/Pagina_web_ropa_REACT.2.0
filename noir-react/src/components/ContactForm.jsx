import { useState } from "react";

const VALORES_INICIALES = { nombre: "", email: "", edad: "", mensaje: "" };

export default function ContactForm() {
  const [valores, setValores] = useState(VALORES_INICIALES);
  const [estado, setEstado] = useState({ tipo: "", mensaje: "" });

  function manejarCambio(e) {
    const { name, value } = e.target;
    setValores((prev) => ({ ...prev, [name]: value }));
  }

  function validar() {
    const errores = [];
    if (!valores.nombre.trim()) errores.push("// nombre es obligatorio");
    if (!valores.email.trim()) errores.push("// email es obligatorio");
    if (!valores.edad) errores.push("// edad es obligatoria");
    if (Number(valores.edad) < 0) errores.push("// edad no puede ser negativa");
    if (!valores.mensaje.trim()) errores.push("// mensaje es obligatorio");
    return errores;
  }

  function manejarEnvio(e) {
    e.preventDefault();
    const errores = validar();

    if (errores.length > 0) {
      setEstado({ tipo: "error", mensaje: errores.join("\n") });
      return;
    }

    setValores(VALORES_INICIALES);
    setEstado({ tipo: "ok", mensaje: "✓ Mensaje enviado. Te respondemos en menos de 24h." });
  }

  return (
    <form className="formulario" onSubmit={manejarEnvio}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="nombre">NOMBRE</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Tu nombre"
            value={valores.nombre}
            onChange={manejarCambio}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">EMAIL</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="tu@correo.com"
            value={valores.email}
            onChange={manejarCambio}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="edad">EDAD</label>
        <input
          type="number"
          id="edad"
          name="edad"
          min="0"
          placeholder="Tu edad"
          value={valores.edad}
          onChange={manejarCambio}
        />
      </div>
      <div className="form-group">
        <label htmlFor="mensaje">MENSAJE</label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows="5"
          placeholder="¿En qué podemos ayudarte?"
          value={valores.mensaje}
          onChange={manejarCambio}
        ></textarea>
      </div>
      <button type="submit" className="btn-dark btn-full">
        ENVIAR MENSAJE →
      </button>

      {estado.mensaje && (
        <div
          id="errores"
          style={{ color: estado.tipo === "error" ? "#FF3333" : "#E8FF00", whiteSpace: "pre-line" }}
        >
          {estado.mensaje}
        </div>
      )}
    </form>
  );
}
