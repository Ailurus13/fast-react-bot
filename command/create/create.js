'use strict';

const { tryDelete } = require('../../lib/discordjs-utils');
const { addShortcut } = require('../../lib/shortcuts');

const info = {
  name: 'Create',
  command: 'create',
  args: 'name * , emojies *',
  description: 'Create a custom reaction shortcut'
};

const action = async (message, args) => {
  const name = args[0];
  const dm = await message.author.createDM();
  const author = message.author;
  if (!name) {
    dm.send('Error: No name provided');
    return;
  }

  const formMessage = await dm.send(
    'React with the emojies you would like to add to your shortcut'
  );
  tryDelete(message);
  
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
      dm.send('Error: No emoji provided');
      return;
    }
    addShortcut(author.id, name, emojis);
    await dm.send(`Shortcut created with name : ${name}`);
  } catch (e) {
    await dm.send(`Error while creating your shortcut ! (${e})`);
  }
};

module.exports = {
  info,
  action
};
