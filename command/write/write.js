'use strict';

const { tryDelete } = require('../../lib/discordjs-utils');
const unicodeAlphabet = require('./unicode-alphabet');

const info = {
  name: 'Write',
  command: 'write',
  args: 'word *',
  description: 'Write a word using reactions on current channel last message'
};

const action = async (message, args) => {
  const messages = await message.channel.messages.fetch({ limit: 2 });
  tryDelete(message);
  const lastMessage = messages.last();
  const mot = args[0]
  const motLower = mot.toLowerCase();
  for (const c of motLower) {
    lastMessage.react(unicodeAlphabet[c]);
  }
};

module.exports = {
  info,
  action
};
