'use strict';

/**
 * @description try to delete a message in the channel (don't work in DMChannel)
 * @param message The message we try to delete
 */
const tryDelete = (message) => {
  if (message.channel.type !== 'dm') {
    message.delete();
  }
};

/**
 * @description send a dm to the author of message
 * @param text
 * @param {Message} message
 */
const sendDM = async (text, message) => {
  const dm = await message.author.createDM();
  dm.send(text);
  return dm;
};

module.exports = {
  tryDelete,
  sendDM
};
