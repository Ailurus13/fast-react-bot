'use strict';

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('shortcuts.json');
const db = low(adapter);

db.defaults({ users: [] }).write();

const addShortcut = (userId, name, emojis) => {
  if (!db.get('users').find({ userId }).value()) {
    db.get('users').push({ userId: userId, "shortcuts": [] }).write();
  }
  if (db.get('users').find({ userId }).get('shortcuts').find({ name }).value()) {
    throw new Error(`Shortcut with name ${name} already exists`);
  }
  db.get('users').find({ userId }).get('shortcuts').push({ name: name.toLowerCase(), emojis }).write();
};

const getShortcuts = (userId) => {
  return db.get('users').find({ userId }).get('shortcuts').value();
};

module.exports = {
  addShortcut,
  getShortcuts
};
