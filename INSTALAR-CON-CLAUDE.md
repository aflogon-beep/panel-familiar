# Instalar el panel con Claude

Guía para instalar el panel con la app de Claude sin tocar código: Claude hace el trabajo y tú solo respondes a sus preguntas y aceptas un par de cosas en el navegador. Son unos 20–30 minutos.

## Antes de empezar (5 minutos)

1. **Crea una cuenta gratuita en Cloudflare:** https://dash.cloudflare.com/sign-up. Verifica el correo y no hace falta configurar nada más: el plan gratuito basta.
2. **Instala la app de escritorio de Claude** (Mac o Windows) e inicia sesión.
3. **Vincula tu ordenador** en la app, o empieza una tarea nueva con tu ordenador seleccionado. Hace falta porque la instalación se hace en tu ordenador: ahí Claude puede abrirte el navegador para entrar en Cloudflare.
4. Opcional: si ya tienes **Node.js** (versión 20 o superior) y **git**, mejor. Si no, Claude te dirá cómo instalarlos.

## El mensaje para Claude

Copia esto en una tarea nueva, con tu ordenador vinculado:

> Quiero instalar en mi cuenta de Cloudflare el panel familiar de https://github.com/aflogon-beep/panel-familiar.
> Trabaja en mi ordenador: descárgalo en una carpeta mía (por ejemplo, Documentos/panel-familiar), lee su archivo CLAUDE.md y sigue su guía de instalación de principio a fin.
> Antes de instalar nada, explícame qué es y hazme las preguntas de configuración. Luego ve paso a paso, avísame cada vez que tenga que hacer algo yo en el navegador y no sigas hasta que cada paso haya salido bien.
> Al terminar, dame la dirección del panel y explícame los primeros pasos.

Claude te irá preguntando: nombres de los peques y de los adultos, nombre de las mascotas, tu ciudad (para el tiempo), cumpleaños, si hay custodia compartida y la contraseña inicial.

Durante la instalación tendrás que hacer dos cosas:
- **Aceptar el acceso de Cloudflare** en el navegador cuando se abra.
- **Guardar la clave de cifrado** (`DATA_KEY`) que te enseñará Claude en tu gestor de contraseñas. Si se pierde, los datos no se pueden recuperar.

## Después de instalar

1. **Entra en el panel** con la contraseña inicial y cámbiala en **Ajustes › 🔐 Seguridad**.
2. **Instálalo como app** en los móviles: Android › Chrome › ⋮ › *Añadir a pantalla de inicio*; iPhone › Safari › Compartir › *Añadir a pantalla de inicio*.
3. **En la tablet de la nevera:** pantalla completa y **modo niños**.
4. **Configura a tu gusto** en Ajustes: rutinas, paguita, premios y calendarios de Google, Outlook o iCloud.

## Para más adelante, conecta Cloudflare a Claude (opcional)

En la app de Claude, ve a **Ajustes › Conectores**, busca **Cloudflare** y conéctalo con tu cuenta. Así, sin abrir la terminal, Claude podrá:
- revisar si el panel funciona y ver sus errores;
- comprobar las copias de seguridad de la base de datos;
- ayudarte si algo deja de ir.

## Actualizar

Cuando haya cambios en el repo, pídele a Claude con tu ordenador vinculado:

> Actualiza mi panel familiar: en la carpeta donde lo instalaste, trae los cambios del repo y vuelve a publicarlo siguiendo su CLAUDE.md.

Los datos de tu familia no se tocan al actualizar.
