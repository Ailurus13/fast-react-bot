'use strict';

const write = require('./write/write');
const clean = require('./clean/clean');
const react = require('./react/react');
const create = require('./create/create');
const gif = require('./gif/gif');
const list = require('./list/list');
const del = require('./delete/delete');
const update = require('./update/update');
const catchou = require('./catchou/catchou');

// Commands
const commands = [write, clean, react, create,  update, del, list, gif, catchou];
const defaultCommand = react;

// Register commands if they are compliant
module.exports = {
  commands: commands.filter((c) => verifyCommand(c)),
  defaultCommand: verifyCommand(defaultCommand) ? defaultCommand : null
};

// Verify the command is compliant to the app
function verifyCommand (c) {
  const cinfoco = c.info ? c.info.command : null;
  const caction = c.action;
  return cinfoco && caction;
}
