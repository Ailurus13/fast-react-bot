'use strict';

const { tryDelete } = require('../../lib/discordjs-utils');
const { addShortcut } = require('../../lib/shortcuts');
const isUnicode = require('../../lib/isUnicode');

const info = {
  name: 'Create',
  command: 'create',
  args: 'name * , emojies *',
  description: 'Create a custom reaction shortcut'
};

const action = async (message, args) => {
  const name = args.shift();
  const dm = await message.author.createDM();
  const author = message.author;

  // No shortcut name
  if (!name) {
    dm.send('Error: No name provided');
    return;
  }

  // Delete command message if possible
  tryDelete(message);

  if (args.length > 0) {
    const emojis = args.filter(isUnicode);
    try {
      await addEmojis(dm, name, author, emojis);
    } catch (e) {
      await dm.send(`Error while creating your shortcut ! (${e})`);
    }
  } else {
    const formMessage = await dm.send(
      'React with the emojies you would like to add to your shortcut'
    );

    // Emote recuperation (60s to do so)
    try {
      const collected = await formMessage.awaitReactions(() => true, {
        time: 60000
      });
      const emojis = collected
        .array()
        .map((messageReaction) => messageReaction.emoji.name);
      await addEmojis(dm, name, author, emojis);
    } catch (e) {
      await dm.send(`Error while creating your shortcut ! (${e})`);
    }
  }
};

// Verify non empty arr and add shortcut
async function addEmojis (dm, name, author, emojis) {
  if (emojis.length <= 0) {
    dm.send('Error: No emojis provided');
    return;
  }
  addShortcut(author.id, name, emojis);
  await dm.send(`Shortcut created :\n${name} : ${emojis.join(' ')}`);
}

module.exports = {
  info,
  action
};
