const { Client, Collection, MessageEmbed, Attachment } = require('discord.js');
const fetch = require("node-fetch");
module.exports = {
  name: "reddit",
  alias: ["yiff","clop","furry","yuri","yaoi"],
  run: (client, message, command, args, emojis) => {
    var nsfw = new Array;
    nsfw = ["yiff","clop","yaoi"];
    const isnsfw = nsfw.find((c) => c.includes(command));
    if (isnsfw) {
      if (message.channel.nsfw) {
        getReddit(command, message.channel);
      }
      else {
        message.channel.send("Este comando solo puede ser enviado a un canal NSFW.");
      }
    }
    else {
      getReddit(command, message.channel);
    }
  }
}

function getReddit(query, channel) {
  if (query == "yuri") {query = "wholesomeyuri"}
	fetch('https://www.reddit.com/r/' + query + '.json?limit=100&?sort=top&t=all')
    .then(res => res.json())
    .then(json => json.data.children.map(v => v.data.url))
    .then(urls => postReddit(query, channel, urls));
}

function postReddit(query, channel, urls) {
	const randomURL = urls[Math.floor(Math.random() * urls.length) + 1];
	try {
		if (randomURL.endsWith("gif") || randomURL.endsWith("jpg") || randomURL.endsWith("png")) {
	  	const embed = new MessageEmbed()
			.setAuthor("r/"+query,"https://i.redd.it/qupjfpl4gvoy.jpg","https://reddit.com/r/"+query)
			.setImage(randomURL)
			.setColor('#DB8E4A')
			.setURL(randomURL)
			.setTitle(randomURL)
			.setFooter("Si dos personas pulsan la ❌ la imagen se borrará.");
				channel.send(embed).then(sentEmbed => {
		    sentEmbed.react("❤️");
				sentEmbed.react("❌");
			});
		} else {
			console.log('Image format is not supported. Choosing another image...');
			postReddit(query, channel, urls);
		}
	} catch (e) {
			console.log('Image not found. Retrying...');
			postReddit(query, channel, urls);
	}

}
