var mysql = require('mysql');

module.exports = {
  name: "furrometro",
  alias: ["furrómetro"],
  run: (client, message, command, args, emojis, con) => {
    var porcentajeFurro;

    con.query("SELECT * FROM users WHERE id='"+message.author.id+"'", function (err, result, fields) {
      if (err) throw err;
      if (result!=null && result!="") {
        var furrylvl = result[0].furrylvl;
        sendFurryLvL(message, furrylvl);
      } else {
        var furrylvl=1;
        sendFurryLvL(message, furrylvl);
      }
    });
  }
}

function sendFurryLvL(message, furrylvl) {
  furrylvl+=30;
  if (furrylvl > 95) {
    porcentajeFurro = randomNumber(95,100);
  } else {
    porcentajeFurro = randomNumber(furrylvl+5,furrylvl-5);
  }
  if (porcentajeFurro > 94) {
    message.channel.send(`Tu nivel de furro es del ${porcentajeFurro} % ${emojis["furryglassses"]}`);
  } else {
    message.channel.send(`Tu nivel de furro es del ${porcentajeFurro} %`);
  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
