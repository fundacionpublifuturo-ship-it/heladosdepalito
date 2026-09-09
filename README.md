# Helados De Palito — Menú digital, carrito y fidelización

Sitio estático (HTML + CSS + JavaScript puro, sin frameworks) para el menú digital de **Helados De Palito** (Ibagué). Incluye carrito con checkout simulado hacia WhatsApp, tarjeta de fidelización digital de 8 sellos y un panel de administración completo para gestionar productos, clientes y pedidos.

Funciona en dos modos, sin cambiar una sola línea del front-end:

- **Modo demo (por defecto):** todo se guarda en el `localStorage` del navegador, sembrado con datos reales del menú (`assets/js/seed.js`). Ideal para probar y mostrar el sitio hoy mismo.
- **Modo producción:** al completar `assets/js/config.js` con tus credenciales de Supabase, las mismas funciones leen y escriben directamente en tu base de datos.

## Estructura del proyecto

```
hp-web/
├── index.html                 Landing / portada
├── menu/
│   ├── index.html              Catálogo público (categorías, buscador, modal de producto)
│   └── checkout.html           Resumen de carrito + formulario + envío a WhatsApp
├── fidelizacion/
│   └── index.html               Tarjeta de sellos del cliente (elemento firma)
├── login/
│   └── index.html               Login unificado: cliente (teléfono + código) / admin (contraseña)
├── admin/
│   ├── index.html                Dashboard con métricas del día
│   ├── productos.html            CRUD de productos y categorías
│   ├── clientes.html             Crear clientes, sumar sellos, canjear premio
│   ├── pedidos.html              Listado de pedidos y cambio de estado
│   └── configuracion.html        Datos del negocio + generador de código QR
├── assets/
│   ├── css/system.css            Sistema de diseño completo (única fuente de estilos)
│   ├── js/config.js              Credenciales de Supabase, WhatsApp, datos del negocio
│   ├── js/seed.js                Catálogo real de productos (semilla del modo demo)
│   ├── js/data.js                Capa de datos: Supabase o localStorage, transparente
│   ├── js/cart.js                Carrito de compra (localStorage) + mensaje de WhatsApp
│   ├── js/auth.js                Sesión de cliente/admin (demo); reemplazar por Supabase Auth en producción
│   ├── js/ui.js                  Header, footer, drawer de carrito, toasts, scroll-reveal
│   ├── js/admin-nav.js           Menú lateral compartido del panel admin
│   ├── js/icons.js               Íconos SVG inline (nunca emojis como ícono de interfaz)
│   └── img/logo.png              Logo oficial de la marca
└── supabase/
    └── schema.sql                 Tablas + políticas RLS listas para pegar en Supabase
```

## Probar el sitio ahora mismo (modo demo)

No necesita instalación de dependencias ni backend.

1. Abre una terminal en la carpeta `hp-web/`.
2. Levanta un servidor local simple, por ejemplo:
   ```bash
   npx serve .
   # o
   python3 -m http.server 8080
   ```
3. Abre `http://localhost:8080/` en el navegador.
4. Contraseña de administrador de prueba: **`palito2026`** (definida en `assets/js/config.js` → `DEMO_ADMIN_PASSWORD`).
5. Cliente de prueba ya cargado: teléfono **`3000000000`**, código **`1234`** (con 3 sellos, para ver la tarjeta en progreso).

> No abras `index.html` con doble clic (`file://`): algunos navegadores bloquean `fetch`/rutas relativas en ese modo. Usa siempre un servidor local o la publicación en Vercel.

## Publicar en GitHub + Vercel

1. Crea un repositorio en GitHub y sube el contenido de esta carpeta tal cual (la raíz del repo debe ser la raíz de `hp-web/`, con `index.html` en la base).
2. En [vercel.com](https://vercel.com), "Add New Project" → importa el repositorio. Al ser un sitio estático no necesita build command ni framework preset (déjalos en blanco / "Other").
3. Cada vez que hagas `git push`, Vercel vuelve a publicar el sitio automáticamente.
4. Copia la URL que te da Vercel (ej. `https://helados-de-palito.vercel.app`) y pégala en **Panel → Negocio y QR** para generar el código QR real que llevará a tus clientes al menú.

## Pasar a producción con Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. Ve a **SQL Editor** y pega/ejecuta todo el contenido de `supabase/schema.sql`. Esto crea las tablas, las políticas de seguridad (RLS) y siembra las categorías + el premio inicial.
3. Ve a **Project Settings → API** y copia tu `Project URL` y tu `anon public key`.
4. Edita `assets/js/config.js`:
   ```js
   window.HP_CONFIG = {
     SUPABASE_URL: "https://tuproyecto.supabase.co",
     SUPABASE_ANON_KEY: "tu-anon-key",
     ...
   };
   ```
5. Agrega en cada archivo HTML, justo antes de `config.js`, la librería de Supabase (una sola línea):
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js"></script>
   ```
6. Carga tus productos reales desde **Panel → Productos** (o adapta `assets/js/seed.js` a sentencias `insert` dentro de `schema.sql`).
7. Vuelve a publicar (`git push`) y Vercel toma los nuevos valores automáticamente.

### Autenticación de administrador en producción

En modo demo, la contraseña de admin vive en texto plano en `config.js` (`DEMO_ADMIN_PASSWORD`) — suficiente para probar, **no para producción real**. Para producción:

1. Activa **Authentication → Providers → Email** en Supabase.
2. Crea un usuario admin desde el panel de Supabase (Authentication → Users → Add user).
3. Inserta su `user_id` en la tabla `admins` (ver `supabase/schema.sql`).
4. Reemplaza `HP_AUTH.loginAdmin()` en `assets/js/auth.js` por una llamada a `supabase.auth.signInWithPassword(...)`, y usa `supabase.auth.getUser()` en `HP_AUTH.requireAdmin()` en vez de leer `localStorage`.

El mismo patrón aplica para clientes si más adelante quieres reemplazar el código de 4 dígitos por un inicio de sesión más robusto (por ejemplo, OTP por SMS).

## Guía rápida para el negocio

**Cargar o editar un producto:** Panel → Productos → "Nuevo producto" o "Editar". Puedes cambiar precio, descripción, foto (URL) y marcarlo como agotado sin tocar código.

**Crear la tarjeta de un cliente nuevo:** Panel → Clientes y sellos → "Crear cliente". Ingresa nombre, teléfono y un código simple (ej. 4 dígitos) que le compartes al cliente. Con ese teléfono + código, el cliente entra a `/login/` y ve su tarjeta en `/fidelizacion/`.

**Sumar un sello:** Panel → Clientes y sellos → botón "+1 sello" junto al cliente, cada vez que complete una compra. Al llegar a 8/8 se habilita "Canjear premio", que reinicia la tarjeta y registra la entrega en su historial. Los clientes nunca pueden sumarse sellos a sí mismos.

**Cambiar el premio:** Panel → Clientes y sellos → sección "Premio actual".

**Ver y actualizar pedidos:** Panel → Pedidos. Cada pedido enviado por WhatsApp desde el checkout queda aquí con un folio único; puedes cambiar su estado (pendiente → en preparación → listo → entregado).

**Imprimir el código QR:** Panel → Negocio y QR. Pega la URL publicada en Vercel y descarga/imprime el QR para mesas, vitrina o empaques.

## Sistema de diseño

Todo el estilo vive en `assets/css/system.css`, controlado por variables CSS (`:root`): paleta de marca (fucsia/morado del logo + acento naranja), tres niveles de texto (nunca negro puro), sombras siempre teñidas, escala de radios, tipografías **Baloo 2** (títulos), **Inter** (cuerpo) e **IBM Plex Mono** (precios, folios, códigos). Los formularios validan en tiempo real (mientras se escribe y al salir del campo, nunca solo al enviar). El sitio respeta `prefers-reduced-motion` y no usa emojis como íconos de interfaz (todos son SVG en `assets/js/icons.js`).

## Nota sobre las fotos de producto

Algunos productos del menú (helados de sabores específicos, algunas empanadas, bebidas y tortas) todavía no tienen foto propia y se muestran con un ícono de marca en su lugar — esto es intencional, no un error. Se pueden agregar en cualquier momento desde **Panel → Productos → Editar → URL de la imagen**, sin tocar código.
