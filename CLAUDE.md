# Panel familiar · guía para Claude

Este repositorio es un panel familiar (tablet en la nevera + móviles) que se instala en la cuenta de Cloudflare de quien lo usa. Lo normal es que la persona que te abre aquí **no sea quien lo programó** y quiera que la guíes para instalarlo y configurarlo. Háblale en español, en lenguaje llano, y sin dar por hecho que es programador.

## Cuando te pidan instalarlo (o con `/instalar`)

Sigue este orden. No avances a un paso si el anterior no ha salido bien.

### 1. Explica qué es (breve)
En 6–8 líneas: qué hace (inicio con tiempo y agenda, rutinas de los peques con puntos y niveles, paguita y hucha, premios, mascota virtual, tareas y exámenes, menú y compra, calendarios externos, modo niños, copias de seguridad), dónde se usa (tablet en la nevera en modo niños + móviles de los adultos) y qué hace falta (una cuenta gratuita de Cloudflare y unos 20 minutos). Los detalles están en `README.md`.

Avisa de las **limitaciones** antes de seguir:
- Está pensado para **exactamente dos peques y dos adultos**. Con otra composición funciona, pero sobrará o faltará una tarjeta. Si es su caso, díselo con claridad y pregúntale si quiere seguir.
- Los textos están en español y los festivos que vienen son los nacionales del curso 2026‑27.

### 2. Haz las preguntas de configuración
Pregunta todo de una vez (usa preguntas de opción múltiple si tu entorno lo permite) y apunta las respuestas:
1. Nombre de cada peque. El primero sale en azul y el segundo en rosa; pregunta si quieren invertirlo.
2. Cómo llamar a los dos adultos (por ejemplo «Papá» y «Mamá», o sus nombres).
3. Nombre de la mascota de cada peque. Si no tienen preferencia, que la elijan luego en la app.
4. Ciudad para el tiempo. Calcula tú la latitud y la longitud.
5. Cumpleaños para el calendario (opcional): nombre, día, mes y año.
6. ¿Custodia compartida? Si es que sí: qué días de lunes a jueves están fuera y si los fines de semana se alternan.
7. Contraseña inicial: que la elija la persona (mínimo 12 caracteres) o generas tú una frase larga y se la enseñas una sola vez.

Con las respuestas, edita **solo** `src/js/00-config.js`. Su formato está comentado en el propio archivo; la custodia usa 0 = lunes … 3 = jueves. Enséñale el resultado.

### 3. Comprueba el equipo
- `node -v` debe ser 20 o superior. Si no, explícale cómo instalar Node.js LTS para su sistema.
- Ejecuta `npm install`.

### 4. Cloudflare
1. `npx wrangler login` abre el navegador: la persona tiene que aceptar ahí. Si no tiene cuenta, que la cree en dash.cloudflare.com (es gratis).
2. `npx wrangler d1 create panel-familiar` y copia el `database_id` en `wrangler.toml`, sustituyendo `PON-AQUI-EL-ID-DE-TU-BASE-DE-DATOS`.
3. Secretos (cada comando lee el valor por la entrada estándar):
   - `FAMILY_KEY`: la contraseña inicial del paso 2.
   - `SESSION_SECRET`: genera uno con `openssl rand -hex 32`.
   - `DATA_KEY`: genera una con `openssl rand -base64 32`. **Antes de guardarla**, dile que la copie en su gestor de contraseñas: cifra los datos y, si se pierde, no se pueden recuperar.
   Pásalos así para que no queden en el historial de la terminal: `openssl rand -hex 32 | npx wrangler secret put SESSION_SECRET`. Para `FAMILY_KEY` y `DATA_KEY`, que la persona necesita ver, enséñaselas una vez y no las escribas en ningún archivo del repo.
4. `npm run deploy`. Al terminar sale la dirección `https://panel-familiar.<subdominio>.workers.dev`.

### 5. Verifica
- `curl -s -o /dev/null -w '%{http_code}' <url>/` debe dar 200.
- `curl -s <url>/api/state` debe dar 401: está protegido, que es lo correcto.
- Si algo falla, mira `npx wrangler tail` mientras la persona abre la página.

### 6. Primeros pasos en la app
Explícale, en este orden:
1. Abrir la dirección y entrar con la contraseña inicial.
2. **Ajustes › 🔐 Seguridad**: poner la contraseña definitiva. Desde ese momento la inicial deja de valer.
3. Instalarla como app: en Android, Chrome › ⋮ › *Añadir a pantalla de inicio*; en iPhone, Safari › Compartir › *Añadir a pantalla de inicio*.
4. En la tablet: pantalla completa y **modo niños** (los peques marcan lo suyo, pero no tocan el dinero, los canjes ni los ajustes).
5. Repasar en **Ajustes** las rutinas, la paguita, los premios y, si quiere, los calendarios de Google, Outlook o iCloud (enlace iCal secreto).

## Actualizar más adelante
`git pull` y `npm run deploy`. Los datos están en D1 y no se tocan al publicar.

## Reglas
- **Nunca** subas a git `.dev.vars`, contraseñas, `DATA_KEY` ni `SESSION_SECRET`. `wrangler.toml` lleva el id de su base de datos: si la persona publica su copia, avísale de que ese id no es secreto, pero tampoco hace falta compartirlo.
- No borres la base de datos ni ejecutes `DELETE` o `DROP` en D1 sin pedir permiso. Hay copias de seguridad diarias, que se pueden ver y restaurar desde la app.
- Si cambias `src/js/00-config.js` después de instalar, hay que volver a publicar con `npm run deploy`. Los nombres de los peques también se pueden cambiar desde la app.

## Si te piden cambiar el código
- `src/js/NN-*.js` se concatenan en orden numérico y **comparten un mismo ámbito**: no hay `import`; una función de un módulo se usa en los siguientes.
- `src/css/NN-*.css` van en orden de cascada.
- `npm run build` genera `dist/index.html` (minificado) y `dist/dev.html` (legible).
- `npm run dev` levanta el Worker en local (http://localhost:8787) con una D1 local. Antes crea `.dev.vars` con `FAMILY_KEY`, `SESSION_SECRET` y `DATA_KEY` (ver `README.md`).
- El estado de la familia es un único JSON (`S`) sincronizado con `/api/state`. Las acciones de la interfaz van por `data-act="…"` y su manejador es `H.<acción>`.
- Prueba los cambios en el navegador, tanto en tamaño tablet (1280×800) como móvil (390×844), antes de publicar.

## Problemas frecuentes
- **«Demasiados intentos» (429):** bloqueo tras 5 contraseñas fallidas; se pasa a los 15 minutos.
- **No sale el tiempo:** revisa la latitud y la longitud en `00-config.js`.
- **Un calendario externo no carga:** el enlace tiene que ser la dirección iCal secreta (.ics), no la pública de la web.
- **No se ven los cambios tras publicar:** recarga una vez; la app se guarda en caché para funcionar sin conexión.
