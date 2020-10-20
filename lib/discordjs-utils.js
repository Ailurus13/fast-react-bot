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

module.exports = {
  tryDelete
};
