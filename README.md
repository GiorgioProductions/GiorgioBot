# GiorgioBot
Bot de Discord para el [servidor de Giorgio Productions](https://discord.gg/p7uvu27).

## Cómo usar
Si quieres hacer un fork deberás instalar las dependencias usando `npm install`.

También necesitarás tener MySQL en tu servidor para poder usar la base de datos. Crea una base de datos y una tabla llamada `users`.

Una vez tengas todo esto renombra el archivo `.env_sample` a `.env` y edita las variables que hay en él.

También deberás escribir las IDs de los canales de tu propio servidor en el archivo `config.json`. A partir de ahí ya puedes editar todo lo que quieras a tu antojo.

Los comandos están en archivos individuales en la carpeta `commands`.

Para iniciar el bot abre el archivo `index.js` con Node.js.