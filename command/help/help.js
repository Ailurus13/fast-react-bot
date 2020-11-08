'use strict';

const { tryDelete, sendDM } = require('../../lib/discordjs-utils');
const { commands } = require('../commandList');

const info = {
  name: 'Help',
  command: 'help',
  args: null,
  description: 'Give informations about all commands'
};

const action = async (message) => {
  const fullCommands = [{ info }, ...commands];

  const helpText = fullCommands
    .filter(c => c.info.description !== 'egg')
    .map(
      (c) =>
        `${process.env.PREFIX} ${c.info.command} : ${c.info.name} - ${c.info.description} 
        (${c.info.args || 'none'})`
    )
    .join('\n');
  await sendDM('```' + helpText + '```', message);
  tryDelete(message);
};

module.exports = {
  info,
  action
};
