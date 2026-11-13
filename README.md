# Panel familiar

Panel para la familia pensado para una **tablet en la nevera** y para los **móviles** de los adultos. Es una sola página web (sin frameworks) servida por un Worker de Cloudflare, con los datos guardados cifrados en una base de datos D1.

## Qué incluye

- **Inicio** con el día, la hora, el tiempo y lo que toca hoy.
- **Rutinas** diarias de los peques, con puntos, niveles, medallas y misiones de la semana.
- **Paguita** semanal según los días con la rutina completa, **hucha** con metas e intereses, y **premios** que se canjean con puntos.
- **Mascota** virtual de cada peque, que crece al cuidarla, con tienda de accesorios y minijuego.
- **Tareas**, **exámenes** y **agenda**: con eventos, cumpleaños, festivos y calendarios de Google, Outlook o iCloud (solo lectura).
- **Menú** de la semana y **lista de la compra** (con búsqueda de productos en Open Food Facts).
- Tareas de **casa**, **buzón** de mensajes entre la familia y entrada por **voz**.
- **Modo niños**: los peques pueden marcar lo suyo, pero no aprobar, canjear, tocar el dinero ni los ajustes.
- **Custodia compartida**, opcional: días fuera y fines de semana alternos.
- **Copias de seguridad** automáticas cada día y restauración desde la app.

La familia es de **dos peques y dos adultos**. Los nombres, colores y demás se configuran en un archivo.

> 💡 **¿Usas Claude Code en la web (claude.ai/code)?** Sigue [INSTALAR-CON-CLAUDE.md](INSTALAR-CON-CLAUDE.md): preparas la cuenta de Cloudflare y un token, y Claude te hace las preguntas de configuración y lo instala. Con Claude Code en tu ordenador basta con abrir el repo y escribir `/instalar`.

## Requisitos

- Node.js 20 o superior.
- Una cuenta gratuita de Cloudflare. El plan gratuito de Workers y D1 basta de sobra.

## Instalación (unos 20 minutos)

```bash
npm install
```

**1. Configura tu familia** en `src/js/00-config.js`: nombres de los peques y de los adultos, nombre de las mascotas, ciudad para el tiempo (latitud y longitud), cumpleaños y, si la tenéis, la custodia.

**2. Entra en Cloudflare** desde la terminal:

```bash
npx wrangler login
```

**3. Crea la base de datos** y pega el `database_id` que te devuelve en `wrangler.toml`:

```bash
npx wrangler d1 create panel-familiar
```

Las tablas se crean solas la primera vez que se usa la app.

**4. Guarda los tres secretos.** Cada comando te pide el valor:

```bash
npx wrangler secret put FAMILY_KEY        # contraseña inicial para entrar la primera vez
npx wrangler secret put SESSION_SECRET    # pega el resultado de: openssl rand -hex 32
npx wrangler secret put DATA_KEY          # pega el resultado de: openssl rand -base64 32
```

> ⚠️ Guarda `DATA_KEY` en un sitio seguro. Con ella se cifran los datos: si la pierdes, no se pueden recuperar.

**5. Publica:**

```bash
npm run deploy
```

Al terminar verás la dirección de tu panel, del tipo `https://panel-familiar.<tu-subdominio>.workers.dev`.

**6. Primera entrada:** abre esa dirección, entra con la contraseña inicial y ve a **Ajustes › 🔐 Seguridad** para poner la definitiva (mínimo 12 caracteres). Desde ese momento la contraseña inicial deja de funcionar.

**7. Instálala como app:**
- **Android (Chrome):** menú ⋮ › *Añadir a pantalla de inicio*.
- **iPhone (Safari):** Compartir › *Añadir a pantalla de inicio*.

Para la tablet de la nevera, pon la app a pantalla completa y activa el **modo niños**.

## Desarrollo en local

Crea un archivo `.dev.vars` (no se sube a git):

```
FAMILY_KEY=una-clave-de-prueba
SESSION_SECRET=cualquier-texto-largo
DATA_KEY=<resultado de: openssl rand -base64 32>
```

Y arranca:

```bash
npm run dev     # http://localhost:8787, con una base de datos D1 local
```

## Cómo está hecho

```
src/shell.html        esqueleto de la página
src/css/NN-*.css      estilos, en orden de cascada
src/js/NN-*.js        lógica; todos los módulos comparten un mismo ámbito y se concatenan en orden
build.mjs             src/ → dist/index.html (un único HTML minificado) y dist/dev.html (legible)
worker/index.mjs      Worker: sirve la página y la API
wrangler.toml         configuración de Cloudflare (D1 y copia de seguridad diaria)
```

- **Datos:** todo el estado de la familia es un JSON que se guarda en D1 cifrado con AES-GCM. Cada dispositivo sincroniza cambios con control de versiones y fusión a tres bandas, así que dos personas pueden apuntar cosas a la vez.
- **Acceso:** una contraseña para toda la familia (PBKDF2), sesiones firmadas con HMAC, bloqueo tras varios intentos fallidos y opción de cerrar la sesión en todos los dispositivos.
- **Seguridad de la página:** CSP estricta con hashes del script y cabeceras de seguridad. Fuera de tu Worker solo se conecta a Open-Meteo (el tiempo), Google Fonts y las imágenes de productos de Open Food Facts.
- **Sin conexión:** un service worker guarda la app y muestra los últimos datos si se va internet.

## Personalizar

- Rutinas, tareas, premios, paguita, menús y nombres se cambian **desde la propia app**, en Ajustes.
- Los **festivos y vacaciones** del curso 2026‑27 están en `src/js/02-logica.js` (`HOLS` y `VACS`). Solo vienen los nacionales: añade los de tu comunidad y tu municipio ahí o como eventos desde la app.
- Los textos están en español.
