'use strict';

const {Message} = require("discord.js");

/**
 * @description try to delete a message in the channel (don't work in DMChannel)
 * @param {Message} message The message we try to delete
 */
const tryDelete = (message) => {
    if (message.channel.type != "dm") {
        message.delete();
    }
};

module.exports = {
    tryDelete
};