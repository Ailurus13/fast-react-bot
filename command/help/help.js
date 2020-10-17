"use strict";

const { commands } = require("../commandList");
const config = require("../../config.json");

const info = {
  name: "Help",
  command: "help",
  args: null,
  description: "Give informations about all commands",
};

const action = (message) => {
  const fullCommands = [{ info }, ...commands];
  const helpText = fullCommands
    .map(
      (c) =>
        `${config.prefix} ${c.info.command} : ${c.info.name} - ${
          c.info.description
        } (${c.info.args || "none"})`
    )
    .join("\n");
  message.channel.send("```" + helpText + "```");
};

module.exports = {
  info,
  action,
};
