'use strict';

const { tryDelete, sendDM } = require('../../lib/discordjs-utils');
const { deleteShortcut } = require('../../lib/shortcuts');

const info = {
  name: 'Delete',
  command: 'delete',
  args: 'name *',
  description: 'Remove a custom reaction shortcut'
};

const action = async (message, args) => {
  const name = args[0];
  const dm = await message.author.createDM();
  const author = message.author;
  if (!name) {
    sendDM('Error: No name provided', message);
    return;
  }
  tryDelete(message);

  // Récupération des emotes (60 secondes pour le faire)
  try {
    deleteShortcut(author.id, name);
    await dm.send(`Shortcut remove with name : ${name}`);
  } catch (e) {
    await sendDM(`Error while removing your shortcut ! (${e})`, message);
  }
};

module.exports = {
  info,
  action
};
