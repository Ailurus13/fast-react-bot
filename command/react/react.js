'use strict';

const shortcuts = require('../../lib/shortcuts');
const { tryDelete } = require('../../lib/discordjs-utils');

const info = {
  name: 'React',
  command: 'react',
  args: 'type *',
  description: 'Add reactions to channel last message based on a selected type'
};

const action = async (message, args) => {
  const type = args[0];
  const reaction = shortcuts.getShortcut(message.author.id, type);
  if (reaction) {
    const messages = await message.channel.messages.fetch({ limit: 2 });
    tryDelete(message);
    const lastMessage = messages.last();
    for (const e of reaction.emojis) {
      await lastMessage.react(e);
    }
  }
};

module.exports = {
  info,
  action
};
