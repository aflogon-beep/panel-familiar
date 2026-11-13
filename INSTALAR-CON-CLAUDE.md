# Instalar el panel con Claude Code en la web

Guía para instalar el panel desde **claude.ai/code** sin tocar código: Claude hace el trabajo y tú solo preparas tres cosas y respondes a sus preguntas. En total son unos 30 minutos.

## 1. Cuenta de Cloudflare (5 min)

1. Crea una cuenta gratuita en https://dash.cloudflare.com/sign-up y verifica el correo.
2. Entra una vez en **Workers y Pages** (menú de la izquierda). Si te pide elegir un subdominio `*.workers.dev`, acepta el que propone o pon uno tuyo: será parte de la dirección de tu panel.
3. Apunta tu **Account ID**: aparece en la columna derecha de la página de Workers y Pages, y también en la dirección del navegador (`dash.cloudflare.com/<ACCOUNT_ID>/…`).

## 2. Token para que Claude pueda publicar (3 min)

1. En Cloudflare: icono de tu perfil (arriba a la derecha) › **My Profile** › **API Tokens** › **Create Token**.
2. Elige la plantilla **Edit Cloudflare Workers** › **Use template**.
3. En **Permissions**, pulsa **+ Add more** y añade: **Account** › **D1** › **Edit**.
4. En **Account Resources**, deja solo tu cuenta. En **Zone Resources**, puedes dejar *All zones*: no se usan.
5. **Continue to summary** › **Create Token**. Copia el token: solo se enseña una vez.

## 3. Tu propio repo privado (2 min)

En tu copia acabarán los nombres de tu familia, así que tiene que ser **privada**:

1. Ve a https://github.com/new/import.
2. En *Your old repository's clone URL* pon `https://github.com/aflogon-beep/panel-familiar`.
3. Nombre: `panel-familiar`, marca **Private** y pulsa **Begin import**.

## 4. Prepara el entorno de Claude (3 min)

En **claude.ai/code**, en la pantalla de nueva sesión:

1. Elige tu repo privado **panel-familiar** (si no aparece, da acceso a la app de GitHub de Claude a ese repo).
2. Abre el selector de entorno (el primer control bajo la caja de mensaje) › **New environment** y rellena:
   - **Nombre:** `panel-familiar`
   - **Network access:** **Custom**, con estos dominios y la casilla *Also include default list of common package managers* marcada:
     ```
     api.cloudflare.com
     *.workers.dev
     ```
   - **Environment variables:**
     ```
     CLOUDFLARE_API_TOKEN=pega-aquí-el-token
     CLOUDFLARE_ACCOUNT_ID=pega-aquí-tu-account-id
     WRANGLER_SEND_METRICS=false
     ```
   - **Add environment.**

> Las variables del entorno las puede leer cualquiera que use ese entorno. Como es tuyo y personal, no pasa nada; no lo compartas.

## 5. El mensaje para Claude

Con el repo y el entorno `panel-familiar` seleccionados, escribe:

> Quiero instalar este panel familiar en mi cuenta de Cloudflare. Lee el CLAUDE.md del repo y sigue su guía de instalación de principio a fin.
> Antes de instalar nada, comprueba que el entorno tiene acceso a Cloudflare, explícame qué es el panel y hazme las preguntas de configuración. Luego ve paso a paso, avísame cuando tenga que hacer algo yo y no sigas hasta que cada paso haya salido bien.
> Al terminar, guarda mi configuración en este repo privado, dame la dirección del panel y explícame los primeros pasos.

(También vale escribir solo `/instalar`.)

Claude te preguntará los nombres de los peques y de los adultos, el nombre de las mascotas, tu ciudad (para el tiempo), los cumpleaños, si hay custodia compartida y la contraseña inicial. Durante la instalación tendrás que **guardar la clave de cifrado** (`DATA_KEY`) que te enseñe en tu gestor de contraseñas: si se pierde, los datos no se pueden recuperar.

## 6. Después de instalar

1. **Entra en el panel** con la contraseña inicial y cámbiala en **Ajustes › 🔐 Seguridad**.
2. **Instálalo como app** en los móviles: Android › Chrome › ⋮ › *Añadir a pantalla de inicio*; iPhone › Safari › Compartir › *Añadir a pantalla de inicio*.
3. **En la tablet de la nevera:** pantalla completa y **modo niños**.
4. **Configura a tu gusto** en Ajustes: rutinas, paguita, premios y calendarios de Google, Outlook o iCloud.

### Opcional: conecta Cloudflare a Claude
En **claude.ai › Ajustes › Conectores**, añade **Cloudflare** y conéctalo con tu cuenta. Así, en cualquier sesión, Claude puede revisar si el panel funciona, ver sus errores o comprobar la base de datos y las copias de seguridad, sin depender del token.

## Actualizar

Cuando haya novedades en el repo original, abre una sesión con tu repo y el entorno `panel-familiar` y escribe:

> Actualiza mi panel con los cambios del repo original siguiendo el CLAUDE.md, conserva mi configuración y vuelve a publicarlo.

Los datos de tu familia no se tocan al actualizar.
