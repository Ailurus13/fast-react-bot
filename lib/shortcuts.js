'use strict';

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('shortcuts.json');
const db = low(adapter);

db.defaults({ shortcuts: [] }).write();

const addShortcut = (name, emojis) => {
  if (db.get('shortcuts').find({ name }).value()) {
    throw new Error(`Shortcut with name ${name} already exists`);
  }
  db.get('shortcuts').push({ name: name.toLowerCase(), emojis }).write();
};

const getShortcuts = () => {
  return db.get('shortcuts').value();
};

module.exports = {
  addShortcut,
  getShortcuts
};