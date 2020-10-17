"use strict";

const defaultReact = require("./default-react");

const info = {
  name: "React",
  command: "react",
  args: "type *",
  description: "Add reactions to channel last message based on a selected type",
};

const action = async (message, args) => {
  const type = args[0];
  const reaction = defaultReact.find((c) => c.name === type);
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
  action,
};
