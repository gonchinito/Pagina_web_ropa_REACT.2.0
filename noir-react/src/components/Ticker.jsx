const MENSAJES = [
  "ENVÍO GRATIS SOBRE $50.000",
  "NUEVA COLECCIÓN SS26",
  "DEVOLUCIONES SIN COSTO",
  "DISEÑO INDEPENDIENTE",
];

export default function Ticker() {
  // Se repite el arreglo para que la animación de scroll sea continua
  const repetido = [...MENSAJES, ...MENSAJES];

  return (
    <div className="ticker">
      <div className="ticker-track">
        {repetido.map((mensaje, i) => (
          <span key={i}>
            {mensaje}
            <span className="sep">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
