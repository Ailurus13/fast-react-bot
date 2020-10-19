'use strict';

const tryDelete = (message) => {
    if (message.channel.type != "dm") {
        message.delete();
    }
};

module.exports = {
    tryDelete
};