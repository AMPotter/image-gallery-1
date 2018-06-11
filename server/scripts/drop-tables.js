const client = require('../db-client');

client.query(`
    DROP TABLE IF EXISTS images;
    DROP TABLE IF EXISTS albums;
`)
  .then(
    () => console.log('drop tables complete'),
    err => console.log(err)
  )
  .then(() => {
    client.end();
  });