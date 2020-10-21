'use strict';

const {
  tryDelete
} = require('../../lib/discordjs-utils');
const {
  getShortcut
} = require('../../lib/shortcuts');

let fullMessage = '';

const info = {
  name: 'Gif',
  command: 'gif',
  args: 'type *',
  description: 'Send all emojis one after the other'
};

const action = async (message, args) => {
  const type = args[0];
  const reaction = getShortcut(message.author.id, type);
  if (reaction) {
    const emojis = reaction.emojis;
    const gifMessage = await message.channel.send(emojis[0]);
    fullMessage += message.author.toString() + ' : ' + emojis[0] + ' ';
    tryDelete(message);
    gifMessage.author.client.setTimeout(() => {
      updateGif(gifMessage, emojis, 1);
    }, process.env.GIF_TIMER);
  }
};

const updateGif = (message, emojis, index) => {
  message.edit(emojis[index]);
  fullMessage += emojis[index] + ' ';
  index++;
  if (index < emojis.length) {
    message.author.client.setTimeout(() => {
      updateGif(message, emojis, index);
    }, process.env.GIF_TIMER);
  } else {
    message.author.client.setTimeout(() => {
      message.edit(fullMessage);
      fullMessage = '';
    }, process.env.GIF_TIMER);
  }
};

module.exports = {
  info,
  action
};
