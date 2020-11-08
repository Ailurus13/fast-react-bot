'use strict';

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('catchou.json');
const db = low(adapter);

db.defaults({ top3: [] }).write();

const { tryDelete } = require('../../lib/discordjs-utils');

const info = {
  name: 'catchou',
  command: 'catchou',
  args: 'none',
  description: 'egg'
};

const action = async (message, args) => {
  tryDelete(message);
  const top = db.get('top3').value();
  let text = 'Top 3 de Nini : \n';
  text = text.concat(top
    .map(
      (c) =>
        `${c.pos}. ${c.name} (Parce que : ${c.reason})`
    )
    .join('\n')
  );
  message.channel.send(text);
  message.channel.send('Mais le best des best c\'est Dodo');
};

module.exports = {
  info,
  action
};
