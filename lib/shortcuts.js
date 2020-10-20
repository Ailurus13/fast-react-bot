'use strict';

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('shortcuts.json');
const db = low(adapter);

db.defaults({ users: [] }).write();

const addShortcut = (userId, name, emojis) => {
  const user = db.get('users').find({ userId });
  if (user.value()) {
    if (user.get('shortcuts').find({ name }).value()) {
      throw new Error(`Shortcut with name ${name} already exists`);
    }
    db.get('users')
      .find({ userId })
      .get('shortcuts')
      .push({ name: name.toLowerCase(), emojis })
      .write();
  } else {
    db.get('users')
      .push({
        userId: userId,
        shortcuts: [{ name: name.toLowerCase(), emojis }]
      })
      .write();
  }
};

const getAllByUser = (userId) => {
  const user = db.get('users').find({ userId });
  if (user.value()) {
    return user.get('shortcuts').value();
  } else {
    throw new Error(`No user exist with id : ${userId}`);
  }
};

const getShortcut = (userId, shortcutName) => {
  return getAllByUser(userId).find((c) => c.name === shortcutName);
};

module.exports = {
  addShortcut,
  getAllByUser,
  getShortcut
};
