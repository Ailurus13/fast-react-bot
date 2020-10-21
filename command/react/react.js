'use strict';

const defaultReact = require('./default-react');
const shortcuts = require('../../lib/shortcuts');
const { tryDelete } = require('../../lib/discordjs-utils');

const info = {
  name: 'React',
  command: 'react',
  args: 'type *',
  description: 'Add reactions to channel last message based on a selected type'
};

const action = async (message, args) => {
  tryDelete(message);
  if (args.length <= 0) {
    const dm = await message.author.createDM();
    dm.send('No shortcut selected');
  }
  const messages = await message.channel.messages.fetch({ limit: 2 });
  const lastMessage = messages.last();
  const allShortcuts = [...defaultReact, ...shortcuts.getAllByUser(message.author.id)];
  for (const type of args) {
    // Merge default shortcuts with custom shortcuts
    const reaction = allShortcuts.find((c) => c.name === type);
    if (reaction) {
      for (const e of reaction.emojis) {
        await lastMessage.react(e);
      }
    }
  }
};

module.exports = {
  info,
  action
};
