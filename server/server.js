const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());

const pg = require('pg');
const Client = pg.Client;
const databaseUrl = 'postgres://localhost:5432/sickpics';
const client = new Client(databaseUrl);
client.connect();

app.get('/api/images', (req, res) => {
  client.query(`
        select id,
            album_id as "albumId",
            title,
            description,
            url
        from images
        order by name;
    `).then(result => {
    res.send(result.rows);
  });
});

app.post('/api/images', (req, res) => {
  const body = req.body;

  client.query(`
        insert into images (album_id, title, description, url)
        values ($1, $2, $3, $4)
        returning *, album_id as "albumId";
    `,
  [body.albumId, body.title, body.description, body.url]
  ).then(result => {
    res.send(result.rows[0]);
  });
});

app.put('/api/images/:id', (req, res) => {
  const body = req.body;

  client.query(`
        update images
        set
            album_id = $1
            title = $2
            description = $3
            url = $4
        where id = $5
        returning *, album_id as "albumId";
    `,
  [body.albumId, body.title, body.description, body.url, req.params.id]
  ).then(result => {
    res.send(result.rows[0]);
  });
});

app.delete('/api/images/:id', (req, res) => {
  client.query(`
        delete from images where id=$1;
    `,
  [req.params.id]
  ).then(() => {
    res.send({ removed: true });
  });
});

app.get('/api/albums', (req, res) => {
  client.query(`
        select * from albums;
    `)
    .then(result => {
      res.send(result.rows);
    });
});

app.get('/api/albums/:id', (req, res) => {
  const albumPromise = client.query(`
        select id, title, description
        from albums a
        where a.id = $1;
    `,
  [req.params.id]);

  const imagesPromise = client.query(`
        select id, title, description, url
        from images
        where quadrant_id = $1; 
    `,
  [req.params.id]);

  Promise.all([albumPromise, imagesPromise])
    .then(results => {
      const albumResult = results[0];
      const imagesresult = results[1];

      if(albumResult.rows.length === 0) {
        res.sendStatus(404);
        return;
      }

      const album = albumResult.rows[0];
      const images = imagesresult.rows;

      album.images = images;

      res.send(album);
    });
});

app.listen(3000, () => console.log('server running...'));