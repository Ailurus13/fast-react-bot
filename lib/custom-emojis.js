'use strict';

function isCustomEmoji (customEmoji) {
  return typeof customEmoji === 'string' && customEmoji.startsWith('<:');
}

function getCustomEmojiId (customEmoji) {
  const emoSplit = customEmoji.split(':');
  return emoSplit[emoSplit.length - 1].slice(0, -1);
}

module.exports = {
  isCustomEmoji,
  getCustomEmojiId
};
