"use strict";

const info = {
  name: "Clean",
  command: "clean",
  args: "messageId",
  description: "Remove all reactions from a message",
};

const action = async (message, args) => {
  const idMessage = args[0];
  if (!idMessage) {
    const messages = await message.channel.messages.fetch({ limit: 2 });
    message.delete();
    const lastMessage = messages.last();
    lastMessage.reactions.removeAll();
  } else {
    try {
      const messageToClean = await message.channel.messages.fetch(idMessage);
      messageToClean.reactions.removeAll();
    } catch (e) {
      console.log(`No message found with id ${idMessage}`);
    }
    message.delete();
  }
};

module.exports = {
  info,
  action,
};
