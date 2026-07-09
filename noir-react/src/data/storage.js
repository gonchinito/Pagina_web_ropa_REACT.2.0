// ============================================================
// Helper genérico de LocalStorage.
// Centraliza el try/catch para que ningún componente explote
// si LocalStorage está lleno, deshabilitado o el JSON es inválido.
// (IA: sugerencia de Claude para evitar duplicar try/catch en
// cada Context — buena práctica de manejo de errores)
// ============================================================

export function leerStorage(clave, valorPorDefecto) {
  try {
    const raw = localStorage.getItem(clave);
    if (!raw) return valorPorDefecto;
    return JSON.parse(raw);
  } catch (error) {
    console.error(`Error leyendo "${clave}" de LocalStorage:`, error);
    return valorPorDefecto;
  }
}

export function guardarStorage(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
    return true;
  } catch (error) {
    console.error(`Error guardando "${clave}" en LocalStorage:`, error);
    return false;
  }
}
