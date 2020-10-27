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
 * @description send the error in dm to the author of message
 * @param err
 * @param message
 */
const error = async (err, message) => {
  const dm = await message.author.createDm();
  dm.send(err);
  return dm;
};

module.exports = {
  tryDelete,
  error
};
