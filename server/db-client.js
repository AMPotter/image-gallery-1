const DATABASE_URL = 'postgres://localhost:5432/sickpics';
const pg = require('pg');
const types = pg.types;
const Client = pg.Client;

types.setTypeParser(20, parseFloat);
types.setTypeParser(1700, parseFloat);

const client = new Client(DATABASE_URL);
client
  .connect()
  .then(() => console.log('connected to database', DATABASE_URL))
  .catch(err => console.error('connection error', err));

client.on('error', err => {
  console.error('\n**** DATABASE ERROR ***\n\n', err);
});

module.exports = client;
