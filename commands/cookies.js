var fs = require('fs');
var variables = require('../variables.json');
var cookies = variables.cookies;

module.exports = {
  name: "cookie",
  alias: ["cookies"],
  run: (client, message, command, args, emojis, con) => {
    message.channel.send(message.author.toString()+' Aquí tienes tu galleta :cookie:');
    cookies = cookies + 1;
    variables.cookies = cookies;
    try {
      var jsonObj = JSON.parse(variables);
    } catch (e) {
      jsonObj = variables;
    }
    //
    var jsonContent = JSON.stringify(jsonObj, null, 2);
    if (jsonObj!=null && jsonObj!="") {
      fs.writeFile("variables.json", jsonContent, 'utf8', function (err) {
        if (err) {
          console.log("An error occured while writing JSON Object to File.");
          return console.log(err);
        }
      });
    }
    message.channel.send(`Galletas entregadas en total: ${cookies}`);
  }
}
