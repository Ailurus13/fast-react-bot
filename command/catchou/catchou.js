'use strict';

const { tryDelete } = require('../../lib/discordjs-utils');

const info = {
  name: 'catchou',
  command: 'catchou',
  args: 'none',
  description: 'Surprise M*&#F!~?'
};

const action = async (message, args) => {
  tryDelete(message);
  message.channel.send('Top 3 - Nini :');
  message.channel.send('1. Kevin');
  message.channel.send('2. Tristan');
  message.channel.send('3. Willou');
  message.channel.send('Mais le best des best c\'est Dodo');
};

module.exports = {
  info,
  action
};
