"use strict";

const { commands, defaultCommand } = require("./commandList");

const help = require("./help/help");

// Init commands that are compliants
const commandsAction = {};
for (const c of commands) {
  commandsAction[c.info.command] = c.action;
}
// Add Help manually to avoid cicle dep
commandsAction[help.info.command] = help.action;

module.exports = (message) => {
  // Get args and command name
  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  // Get the action from command name
  const action = commandsAction[command];
  if (action) {
    // Execute command
    action(message, args);
  } else {
    // Execute default command
    const defaultAction = defaultCommand ? defaultCommand.action : null;
    if (defaultAction) {
      // Args of default action is the command name
      defaultAction(message, [command]);
    } else {
      console.log(`No default action implemented`);
    }
  }
};
