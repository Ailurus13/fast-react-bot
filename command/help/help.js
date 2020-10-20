'use strict';

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
    .map(
      (c) =>
        `${process.env.PREFIX} ${c.info.command} : ${c.info.name} - ${c.info.description} 
        (${c.info.args || 'none'})`
    )
    .join('\n');
  const dm = await message.author.createDM();
  dm.send('```' + helpText + '```');
  message.delete();
};

module.exports = {
  info,
  action
};
