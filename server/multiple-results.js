const client = require('./db.client');

client
  .query(
    `
    select id, title, description
    from albums a;

    select id, title, description, album_id, url
    from images;
`
  )
  .then(results => {
    console.log(results);
  })
  .then(() => client.end);
