const Discord = require("discord.js");

const client = new Discord.Client();

const config = require("./config.json");

client.on("ready", () => {
  console.log(
    `Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`
  );
  client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);
});

client.on("guildCreate", (guild) => {
  console.log(
    `New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`
  );
  client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);
});

client.on("guildDelete", (guild) => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);
});

client.on("message", async (message) => {
  if (message.author.bot) return;

  if (!message.content.startsWith(config.prefix)) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Ajout rapide de réactions
  const reactionsCommand = [
    { name: "love", emojis: ["🥰", "❤️", "💟", "💗", "💘", "💖"] },
    { name: "cul", emojis: ["🍑"] },
  ];
  const reaction = reactionsCommand.find((c) => c.name === command);
  if (reaction) {
    const messages = await message.channel.messages.fetch({ limit: 2 });
    message.delete();
    const lastMessage = messages.last();
    reaction.emojis.forEach((e) => {
      lastMessage.react(e);
    });
  }

  // Ecriture d'un mot en réaction
  const abc = {
    c: "🇨",
  };
  if (command === "write") {
    const messages = await message.channel.messages.fetch({ limit: 2 });
    message.delete();
    const lastMessage = messages.last();
    const mot = args[0];
    console.log(mot);
    console.log(lastMessage);
  }
});

client.login(config.token);
