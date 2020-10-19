'use strict';

const { addShortcut } = require('../../lib/shortcuts');

const info = {
  name: 'Create',
  command: 'create',
  args: 'name * , emojies *',
  description: 'Create a custom reaction shortcut'
};

const action = async (message, args) => {
  const name = args[0];
  if (!name) {
    message.channel.send('Error: No name provided');
    return;
  }
  const formMessage = await message.channel.send(
    'React with the emojies you would like to add to your shortcut'
  );
  // Récupération des emotes (60 secondes pour le faire)
  try {
    const collected = await formMessage.awaitReactions(
      () => {
        return true;
      },
      { time: 60000 }
    );
    const emojis = collected
      .array()
      .map((messageReaction) => messageReaction.emoji.name);
    if (emojis.length <= 0) {
      message.channel.send('Error: No emoji provided');
      return;
    }
    addShortcut(name, emojis);
    await message.channel.send(`Shortcut created with name : ${name}`);
  } catch (e) {
    await message.channel.send(`Error while creating your shortcut ! (${e})`);
  }
};

module.exports = {
  info,
  action
};
