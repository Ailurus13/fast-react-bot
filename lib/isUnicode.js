'use strict';

module.exports = (char) => {
  return char.charCodeAt(0) > 127;
};
