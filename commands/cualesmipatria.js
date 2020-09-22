module.exports = {
  name: "cualesmipatria",
  alias: ["cuálesmipatria"],
  run: (client, message, command, args, emojis) => {
    var furrolandia = new Array;
    furrolandia[1] = `FURROLANDIA ES NUESTRA PATRIA ${emojis["communism"]}`;
    furrolandia[2] = `FURROLANDIA ES TU PATRIA ${emojis["communism"]}`;
    furrolandia[3] = `FURROLANDIA ES MI PATRIA ${emojis["communism"]}`;
    furrolandia[4] = `Furrolandia es nuestra patria ${emojis["communism"]}`;
    furrolandia[5] = `Furrolandia es tu patria ${emojis["communism"]}`;
    furrolandia[6] = `Furrolandia es mi patria ${emojis["communism"]}`;
    furrolandia[7] = `¿Acaso lo dudas, traidor? Furrolandia es tu patria ${emojis["communism"]}`;
    furrolandia[8] = `¿ACASO LO DUDAS, TRAIDOR? FURROLANDIA ES TU PATRIA ${emojis["communism"]}`;
    furrolandia[9] = `NO HAY PATRIA COMO FURROLANDIA ${emojis["communism"]}`;
    var foto = new Array;
    foto[1] = 'media/furrolandia/furrolandia.png';
    foto[2] = 'media/furrolandia/revolucion furrolandesa.png';
    lafoto = randomNumber(1,10);
    if (lafoto>5) {
      lafoto = 2;
    } else {lafoto=1;}
    message.channel.send(furrolandia[randomNumber(1,9)],{files:[foto[lafoto]]});
  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
