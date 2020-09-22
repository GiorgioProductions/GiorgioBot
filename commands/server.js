module.exports = {
  name: "server",
  alias: ["sv"],
  run: (client, message, command, args, emojis) => {
    if (message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
    }
  }
}
