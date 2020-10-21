'use strict';

const { tryDelete } = require('../../lib/discordjs-utils');
const { deleteShortcut, getShortcut } = require('../../lib/shortcuts');

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
    dm.send('Error: No name provided');
    return;
  }
  if (!getShortcut(author.id, name)) {
    dm.send(`Error: No shortcut corresponding to ${name}`);
    return;
  }
  tryDelete(message);

  // Récupération des emotes (60 secondes pour le faire)
  try {
    deleteShortcut(author.id, name);
    await dm.send(`Shortcut remove with name : ${name}`);
  } catch (e) {
    await dm.send(`Error while removing your shortcut ! (${e})`);
  }
};

module.exports = {
  info,
  action
};
