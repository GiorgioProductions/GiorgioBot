const { Client, Collection, MessageEmbed, Attachment } = require('discord.js');
module.exports = {
  name: "menu",
  alias: ["pedir"],
  run: (client, message, command, args, emojis, con) => {
    switch (command) {

          case "menu":
          if (message.channel.id===config.channels.femboyhooters || message.channel.id===config.channels.admin) {
            message.channel.send("Esto es lo que puedes pedir en Femboy Hooters:\n🍔 Hamburguesa\n🍗 Alitas de pollo\n🥗 Ensalada\n🌮 Tacos");
          } else {
            message.channel.send(`${lang.furrosonly} ${client.channels.cache.get(config.channels.femboyhooters).toString()}, ${message.author}`);
          }
          break;

          case "pedir":
          if (message.channel.id===config.channels.femboyhooters || message.channel.id===config.channels.admin) {
            if (args.length > 0) {
              const pedido = args[0].toUpperCase();
              if (pedido == "BURGER" || pedido == "HAMBURGUESA" || pedido == "AMBORGESA") {
                mensaje = message.author.toString()+" ha pedido una hamburguesa";
                imagen = "https://media1.tenor.com/images/36e7d5af460394907d87b14974eeff7a/tenor.gif?itemid=8669971";
                author = "padge";
              } else
              if (pedido == "ALITAS" || pedido == "POLLO") {
                mensaje = message.author.toString()+" ha pedido unas alitas de pollo";
                imagen = "https://i.pinimg.com/originals/32/e4/ed/32e4ed12782f648b79a10127bcdba9f1.gif";
                author = "Hooters";
              } else
              if (pedido == "ENSALADA") {
                mensaje = message.author.toString()+" ha pedido una ensalada";
                imagen = "https://media1.tenor.com/images/5a8a38036ce2de7fe783f4446fc6a9bd/tenor.gif?itemid=5334914";
                author = "Tyler";
              } else
              if (pedido == "TACOS" || pedido == "TACO" || pedido == "TAQUITOS") {
                mensaje = message.author.toString()+" ha pedido unos taquitos";
                imagen = "https://media.giphy.com/media/l1J3Uem2uwO6BzDqw/giphy-downsized-medium.gif";
                author = "Hooters";
              }
              else {
                 return message.channel.send("Lo sentimos, no tenemos eso en el menú, "+message.author.toString());
              }
              const camareros = new Array;
              camareros[1] = "https://i.gyazo.com/d713842fb83b370916e48229706a1b5e.png";
              camareros[2] = "https://i.gyazo.com/51cc5ce7f929aef28c6d6b0a86fe8b65.png";
              camareros[3] = "https://i.gyazo.com/78b9313bf9cfed910023c2cba218cc2f.png";
              camareros[4] = "https://i.gyazo.com/1467728a3b03f99ab4c0b10cffb131d4.png";
              camareros[5] = "https://i.gyazo.com/5c345630c944fa9c19b89550a6b8d79d.png";

              camarero = camareros[randomNumber(1,5)];

              const embed = new MessageEmbed()
              .setDescription(mensaje)
              .setFooter("Image by "+author)
              .setImage(imagen)
              .setThumbnail(camarero)
              message.channel.send(embed);

            } else {
              message.channel.send("Especifica qué quieres pedir, por favor, "+message.author.toString());
            }
          } else {
            message.channel.send(`${lang.furrosonly} ${client.channels.cache.get(config.channels.femboyhooters).toString()}, ${message.author}`);
          }
          break;
        }
  }
}
