'use strict';

const defaultReact = require('./default-react');
const shortcuts = require('../../lib/shortcuts');

const info = {
  name: 'React',
  command: 'react',
  args: 'type *',
  description: 'Add reactions to channel last message based on a selected type'
};

const action = async (message, args) => {
  const type = args[0];
  // Merge default shortcuts with custom shortcuts
  const allShortcuts = [...defaultReact, ...shortcuts.getShortcuts()];
  const reaction = allShortcuts.find((c) => c.name === type);
  if (reaction) {
    const messages = await message.channel.messages.fetch({ limit: 2 });
    message.delete();
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
