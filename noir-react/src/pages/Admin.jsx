import { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";

const VACIO = {
  nombre: "",
  precio: "",
  categoria: "",
  imagen: "",
  stock: "En stock",
  badge: "",
  descripcion: "",
};

// ============================================================
// Admin
// Panel donde se evidencia el CRUD completo sobre LocalStorage:
//   Create -> formulario "Nuevo producto"
//   Read   -> tabla de productos actuales
//   Update -> botón "Editar" carga el producto en el formulario
//   Delete -> botón "Eliminar" con confirmación
// ============================================================
export default function Admin() {
  const { productos, crearProducto, actualizarProducto, eliminarProducto } = useProducts();
  const [form, setForm] = useState(VACIO);
  const [editandoId, setEditandoId] = useState(null);
  const [errores, setErrores] = useState([]);
  const [mensajeOk, setMensajeOk] = useState("");

  function manejarCambio(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function limpiarFormulario() {
    setForm(VACIO);
    setEditandoId(null);
    setErrores([]);
  }

  function manejarSubmit(e) {
    e.preventDefault();
    setMensajeOk("");

    const resultado = editandoId
      ? actualizarProducto(editandoId, form)
      : crearProducto(form);

    if (!resultado.ok) {
      setErrores(resultado.errores);
      return;
    }

    setErrores([]);
    setMensajeOk(editandoId ? "✓ Producto actualizado." : "✓ Producto creado.");
    limpiarFormulario();
  }

  function manejarEditar(producto) {
    setEditandoId(producto.id);
    setForm({
      nombre: producto.nombre,
      precio: producto.precio,
      categoria: producto.categoria,
      imagen: producto.imagen,
      stock: producto.stock,
      badge: producto.badge,
      descripcion: producto.descripcion,
    });
    setMensajeOk("");
    setErrores([]);
  }

  function manejarEliminar(id, nombre) {
    const confirmado = window.confirm(`¿Eliminar "${nombre}" del catálogo?`);
    if (!confirmado) return;

    const resultado = eliminarProducto(id);
    if (!resultado.ok) {
      setErrores([resultado.error]);
      return;
    }

    setErrores([]);
    setMensajeOk("✓ Producto eliminado.");
    if (editandoId === id) limpiarFormulario();
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <Link to="/" className="nav-logo admin-logo">
          NOIR
        </Link>
        <h1>Panel de Administración — Productos</h1>
        <Link to="/" className="btn-ghost">
          ← Volver a la tienda
        </Link>
      </header>

      <div className="admin-grid">
        <form className="formulario admin-form" onSubmit={manejarSubmit}>
          <h2>{editandoId ? "Editar producto" : "Nuevo producto"}</h2>

          <div className="form-group">
            <label>NOMBRE</label>
            <input name="nombre" value={form.nombre} onChange={manejarCambio} placeholder="Ej: Hoodie Técnico" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>PRECIO (CLP)</label>
              <input
                type="number"
                name="precio"
                min="0"
                value={form.precio}
                onChange={manejarCambio}
                placeholder="22000"
              />
            </div>
            <div className="form-group">
              <label>CATEGORÍA</label>
              <input
                name="categoria"
                value={form.categoria}
                onChange={manejarCambio}
                placeholder="TOPS"
              />
            </div>
          </div>

          <div className="form-group">
            <label>IMAGEN (ruta /img/...)</label>
            <input
              name="imagen"
              value={form.imagen}
              onChange={manejarCambio}
              placeholder="/img/Hoodie_tecnico.png"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>STOCK</label>
              <input name="stock" value={form.stock} onChange={manejarCambio} />
            </div>
            <div className="form-group">
              <label>BADGE (opcional)</label>
              <input name="badge" value={form.badge} onChange={manejarCambio} placeholder="NUEVO" />
            </div>
          </div>

          <div className="form-group">
            <label>DESCRIPCIÓN</label>
            <textarea
              name="descripcion"
              rows="3"
              value={form.descripcion}
              onChange={manejarCambio}
            ></textarea>
          </div>

          {errores.length > 0 && (
            <div style={{ color: "#FF3333" }}>
              {errores.map((err, i) => (
                <p key={i}>// {err}</p>
              ))}
            </div>
          )}
          {mensajeOk && <p style={{ color: "#E8FF00" }}>{mensajeOk}</p>}

          <div className="admin-form-actions">
            <button type="submit" className="btn-dark">
              {editandoId ? "Guardar cambios" : "Crear producto"}
            </button>
            {editandoId && (
              <button type="button" className="btn-ghost" onClick={limpiarFormulario}>
                Cancelar
              </button>
            )}
          </div>
        </form>

        <div className="admin-lista">
          <h2>Catálogo actual ({productos.length})</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="admin-row-producto">
                      <img src={p.imagen} alt={p.nombre} />
                      <span>{p.nombre}</span>
                    </div>
                  </td>
                  <td>{p.categoria}</td>
                  <td>${p.precio.toLocaleString("es-CL")}</td>
                  <td className="admin-acciones">
                    <button className="btn-cantidad" onClick={() => manejarEditar(p)}>
                      Editar
                    </button>
                    <button className="btn-eliminar" onClick={() => manejarEliminar(p.id, p.nombre)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
