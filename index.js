const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

const commandHandler = require("./command/commandHandler");

client.on("ready", () => {
  console.log(`Bot has started on ${client.guilds.cache.size} guilds.`);
  client.user.setActivity(`!fr help`);
});

client.on("guildCreate", (guild) => {
  console.log(`Joined guild ${guild.id}`);
});

client.on("guildDelete", (guild) => {
  console.log(`Removed from ${guild.id}`);
});

client.on("message", async (message) => {
  // Avoid bot responding to each others
  if (message.author.bot) return;

  // Ignore message not starting with prefix
  if (!message.content.startsWith(config.prefix)) return;

  commandHandler(message);
});

client.login(config.token);
