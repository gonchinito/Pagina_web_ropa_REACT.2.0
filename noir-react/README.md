# NOIR — Proyecto React

Este es mi proyecto de la asignatura, migré mi tienda NOIR (que tenía antes en HTML, CSS y JS puro) a una SPA hecha en React con Vite.

## Cómo lo corro

```bash
npm install
npm run dev
```

Se abre en `http://localhost:5173`. Para entrar al panel de admin, hay un link arriba en el menú que dice "Admin", o directo en `http://localhost:5173/admin`.

## Cómo está organizado

Dividí todo en carpetas dentro de `src/`:

- `components/` → los componentes que se repiten o se reutilizan (la tarjeta de producto, el navbar, el carrito, etc.)
- `context/` → ahí dejé el estado global usando Context API, uno para los productos y otro para el carrito
- `data/` → los productos iniciales y una función para leer/guardar en LocalStorage
- `pages/` → la página principal (Home) y la del panel de admin

## Lo que hice para cumplir la rúbrica

**Componentes, props y estado**
Separé todo en componentes chicos: ProductCard, Navbar, CartPanel, etc. Cada uno recibe sus props y algunos manejan su propio estado con `useState`. El carrito y los productos los pasé a Context API porque varios componentes distintos necesitaban acceder a esa info (por ejemplo el navbar necesita saber cuántos productos hay en el carrito, y el catálogo necesita poder agregar productos a ese mismo carrito).

**CRUD con LocalStorage**
Hice dos partes con CRUD:
1. El carrito de compras: agregar, ver, subir/bajar cantidad y sacar productos. Todo queda guardado en LocalStorage para que no se pierda si recargas la página.
2. El panel de Admin (`/admin`): ahí se pueden crear productos nuevos, editarlos y eliminarlos del catálogo. También queda todo en LocalStorage.

**Consumo de API**
Agregué una sección que se llama "Tendencias Internacionales" que trae productos reales desde una API pública (FakeStoreAPI) usando fetch con async/await. Le puse manejo de errores por si la API no responde o se cae internet, muestra un mensaje en vez de romper la página.

**Buenas prácticas**
Validé los formularios antes de guardar cualquier cosa (que no quede vacío el nombre, que el precio sea mayor a 0, etc.) y metí el manejo de errores de LocalStorage en un solo archivo (`storage.js`) para no repetir el mismo `try/catch` en cada componente. También dejé las 3 funciones del CRUD de productos (`crearProducto`, `actualizarProducto`, `eliminarProducto`) devolviendo siempre el mismo formato `{ ok, error(es) }`, para que el panel de Admin maneje los errores igual en los tres casos. Y le agregué `prop-types` a `ProductCard` para validar en desarrollo que las props lleguen con el tipo correcto.

## Sobre el uso de IA

Usé Claude (la IA de Anthropic) durante todo el desarrollo de este proyecto, no solo para una parte. La usé para:
- Que me ayudara a pasar mi código viejo de JS puro (el `carrito.js`) a un Context de React, porque no tenía idea cómo se hacía eso con hooks.
- Que me explicara cómo armar el CRUD de productos en LocalStorage paso a paso.
- Que me ayudara con el fetch a la API externa, el manejo de los estados de carga/error.
- Resolver errores cuando me tiraba pantalla en blanco o algo no cargaba (tema de Node.js, permisos de PowerShell, etc.)

Básicamente fue mi apoyo en todo el proceso, desde armar la estructura de carpetas hasta debuggear errores al correr el proyecto en mi compu. Dejé algunos comentarios en el código marcados como `(IA: ...)` en las partes donde fue más directa la ayuda.
