import { useEffect } from "react";

export default function Lightbox({ src, nombre, onClose }) {
  // Cerrar con Escape (efecto de ciclo de vida -> buena práctica de limpieza)
  useEffect(() => {
    function manejarTecla(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", manejarTecla);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", manejarTecla);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="lightbox activo" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <button className="lightbox-close" onClick={onClose}>
        ✕
      </button>
      <div className="lightbox-inner">
        <img src={src} alt={nombre} className="lightbox-img" />
      </div>
      <span className="lightbox-nombre">{nombre}</span>
    </div>
  );
}
