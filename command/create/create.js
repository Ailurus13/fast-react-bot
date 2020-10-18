"use strict";

const info = {
  name: "Create",
  command: "create",
  args: "name * , emojies *",
  description: "Create a custom reaction shortcut",
};

const action = async (message, args) => {
  const formMessage = await message.channel.send(
    "React with the emojies you would like to add to your shortcut"
  );
  // Récupération des emotes (60 secondes pour le faire)
  try {
    const collected = await formMessage.awaitReactions(
      () => {
        return true;
      },
      { time: 60000 }
    );
    const emojies = collected
      .array()
      .map((messageReaction) => messageReaction.emoji.name);
    // TODO: Add to a dynamic file
    // TODO: Read the into the dynamic file for the react command
    await message.channel.send("Shortcut created !");
  } catch (e) {
    await message.channel.send(`Error while creating your shortcut ! (${e})`);
  }
};

module.exports = {
  info,
  action,
};
