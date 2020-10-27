'use strict';

const { tryDelete, sendDM } = require('../../lib/discordjs-utils');
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
  const author = message.author;

  // No shortcut name
  if (!name) {
    sendDM('Error: No name provided', message);
    return;
  }

  // Delete command message if possible
  tryDelete(message);

  if (args.length > 0) {
    const emojis = args.filter(isUnicode);
    try {
      await addEmojis(message, name, author, emojis);
    } catch (e) {
      await sendDM(`Error while creating your shortcut ! (${e})`, message);
    }
  } else {
    const formMessage = await sendDM(
      'React with the emojies you would like to add to your shortcut',
      message
    );

    // Emote recuperation (60s to do so)
    try {
      const collected = await formMessage.awaitReactions(() => true, {
        time: 60000
      });
      const emojis = collected
        .array()
        .map((messageReaction) => messageReaction.emoji.name);
      await addEmojis(message, name, author, emojis);
    } catch (e) {
      await sendDM(`Error while creating your shortcut ! (${e})`, message);
    }
  }
};

// Verify non empty arr and add shortcut
async function addEmojis (message, name, author, emojis) {
  if (emojis.length <= 0) {
    sendDM('Error: No emojis provided', message);
    return;
  }
  addShortcut(author.id, name, emojis);
  await sendDM(`Shortcut created :\n${name} : ${emojis.join(' ')}`, message);
}

module.exports = {
  info,
  action
};
