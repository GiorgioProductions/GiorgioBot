const { Client, Collection, MessageEmbed, Attachment } = require('discord.js');
const client = new Client();
const colors = require('colors');
require('dotenv').config();
var fs = require('fs');
var mysql = require('mysql');
const fetch = require("node-fetch");
const config = require('./config.json');
const prefix = config.prefix;

var con = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME
  });

function handleDisconnect(){
	con.on('error', function(err) {
		console.log("Disconnected from the database.");
		handleDisconnect();
	});
}

handleDisconnect();

client.on('ready', () => {
	console.log(colors.bgWhite.black('Bot iniciado como '+client.user.tag));
	client.user.setPresence({
		status: "online",
		activity: {
			name: "yiff",
			type: "WATCHING",
			url: "https://www.youtube.com/GiorgioProductions"
		}
	});
});

//Cargar comandos
client.commands = new Collection();
let commands = fs.readdirSync("./commands").filter((f) => f.endsWith(".js"));
for (var jsfile of commands) {
	let commandfile = require("./commands/"+jsfile);
	client.commands.set(commandfile.name, commandfile);
	console.log(jsfile+" loaded");
}

client.on('message', (message) => {

	if (message.guild == null) {return;} //Ignorar si el mensaje es un MD
	if (message.author.bot) {return;} //Ignorar mensaje si lo ha puesto un bot

	// Mostrar chat en la consola
	if (message.content !="") {
		console.log(colors.gray(message.author.tag+": "+message.content));
	} else {
		console.log(colors.gray(message.author.tag+": (Imagen)"));
	}

	//AUMENTAR NIVEL DE FURRISMO
	aumentarNivelFurry(message);

	//Emojis
	var emojis= new Array;
	emojis["communism"] = message.guild.emojis.cache.find(emoji => emoji.name === "communism");
	emojis["furryglasses"] = message.guild.emojis.cache.find(emoji => emoji.name === "furryglasses");
	emojis["taploop"] = message.guild.emojis.cache.find(emoji => emoji.name === "taploop");
	emojis["bionicle"] = message.guild.emojis.cache.find(emoji => emoji.name === "bionicle");
	emojis["eminem"] = message.guild.emojis.cache.find(emoji => emoji.name === "eminem");

	//Dar like a fotos
	likePictures(message, emojis);

	//   --- COMMANDS ---
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	let cmd = client.commands.get(command) || client.commands.find((c) => c.alias.includes(command));
	if (cmd) {
		cmd.run(client, message, command, args, emojis, con);
	}

	checkText(message);

});

client.on('messageReactionAdd', (reaction, user) => {
	if (!reaction.message.author.bot) {return;}
  let limit = 3; // La tercera reacción es la del bot.
  if (reaction.emoji.name == '❌' && reaction.count >= limit) {
		if (reaction.message.channel.id === config.channels.furros ||
			reaction.message.channel.id === config.channels.furritos ||
			reaction.message.channel.id === config.channels.yuri ||
			reaction.message.channel.id === config.channels.yaoi ||
			reaction.message.channel.id === config.channels.nsfw) {
			reaction.message.delete();
			console.log(colors.red("Imagen eliminada"));
		}
	}
});

function likePictures(message, emojis) {
	if (message.channel.id==config.channels.dibujos ||
			message.channel.id==config.channels.dibujosnsfw ||
			message.channel.id==config.channels.ponytown ||
			message.channel.id==config.channels.minecraft) {
		if (message.attachments.size > 0) {
			message.react("❤️");
			message.react("🗿");
			message.react(emojis["eminem"]);
		}
	}
}

function checkText(message) {
	if (message.content.toString().toLowerCase().includes("slipknot")) {
		message.channel.send('https://cdn.discordapp.com/attachments/721830228447461406/758038320088612934/slipknot.gif');
	} else

	if (message.content.toString().toLowerCase() == 'otaku muerto') {
		message.channel.send('abono pa mi huerto');
	} else

	if (message.content.toString().toLowerCase() == 'furro muerto') {
		message.channel.send('abono pa mi huerto');
	} else

	if (message.content.toString().toLowerCase() == "pizza") {
		message.channel.send('con piña');
	} else

	if (message.content.toString().toLowerCase().includes("soy programador")) {
		message.channel.send("https://cdn.discordapp.com/attachments/721830228447461406/758038311578108094/programador.gif");
	}

	if (message.content.toString().toLowerCase().includes("soy comunista") ||
	message.content.toString().toLowerCase().includes("sirvo a la union sovietica") ||
	message.content.toString().toLowerCase().includes("sirvo a la unión soviética") ||
	message.content.toString().toLowerCase().includes("sirvo a la unión sovietica") ||
	message.content.toString().toLowerCase().includes("sirvo a la union soviética")) {
		message.channel.send("https://cdn.discordapp.com/attachments/721830228447461406/758036869236916245/comunista.png");
	}

	if (message.content.toString().toLowerCase().includes("viva chueca")) {
		message.channel.send({files:["https://cdn.discordapp.com/attachments/721830228447461406/758036676697391184/viva_chueca.mp4"]});
	}

	if (message.content.toString().toUpperCase()=="Israel".toUpperCase()) {
		message.channel.send('¿Alguien ha dicho Palestina?');
	}

	if (message.content.toString().toUpperCase().includes("BETIS") ||
			message.content.toString().toUpperCase().includes("BETI")) {
		message.channel.send('viva er betis');
	}
}

function aumentarNivelFurry(message) {
	if (message.channel.id === config.channels.furritos ||
		message.channel.id === config.channels.furros ||
		message.channel.id === config.channels.admin) {

			//NO AUMENTAR NIVEL DE FURRISMO SI SE ESTÁ USANDO EL FURRÓMETRO
			if (message.content.toString().toLowerCase().startsWith("!furrometro") ||
				message.content.toString().toLowerCase().startsWith("!furrómetro")) {
					return;
				}

			con.query("SELECT * FROM users WHERE id='"+message.author.id+"'", function (err, result, fields) {
				if (err) throw err;
				if (result!=null && result!="") {
					var furrylvl = result[0].furrylvl
					furrylvl += 1;
					var sql = "UPDATE users SET furrylvl = '"+furrylvl+"' WHERE id = '"+message.author.id+"'";
					con.query(sql, function (err, result) {
						if (err) throw err;
					   console.log("Aumentado el nivel de furrismo de "+message.author.tag+" a "+furrylvl);
				  	});
				} else {
					furrylvl=1;
					var sql = "INSERT INTO users (id, furrylvl) VALUES ('"+message.author.id+"', '"+furrylvl+"')";
					con.query(sql, function (err, result) {
						if (err) throw err;
					   console.log("Registrado a "+message.author.tag+" en el medidor de furrismo");
				  	});
				}
			});
			
	}
}

client.login(process.env.DISCORD_TOKEN);
