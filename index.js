const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

const unicodeAlphabet = require("./unicode-alphabet");
const defaultReact = require("./default-react");

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
  if (message.author.bot) return;

  if (!message.content.startsWith(config.prefix)) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Affiche la liste des commandes
  if (command === "help") {
    //TODO
  }

  // Ecriture d'un mot en réaction
  if (command === "write") {
    const messages = await message.channel.messages.fetch({ limit: 2 });
    message.delete();
    const lastMessage = messages.last();
    const mot = args[0];
    for (const c of mot) {
      lastMessage.react(unicodeAlphabet[c]);
    }
  }
  // Ajout rapide de réactions
  const reaction = defaultReact.find((c) => c.name === command);
  if (reaction) {
    const messages = await message.channel.messages.fetch({ limit: 2 });
    message.delete();
    const lastMessage = messages.last();
    for (const e of reaction.emojis) {
      await lastMessage.react(e);
    }
  }
});

client.login(config.token);
