const express = require('express');
const app = express();

const cors = require('cors');
const morgan = require('morgan');
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

const pg = require('pg');
const Client = pg.Client;
const databaseUrl = 'postgres://localhost:5432/sickpics';
const client = new Client(databaseUrl);
client.connect();

app.get('/api/images', (req, res, next) => {
  client
    .query(
      `
        select id,
            album_id as "albumId",
            title,
            description,
            url
        from images
        order by name;
    `
    )
    .then(result => {
      res.send(result.rows);
    })
    .catch(next);
});

app.post('/api/images', (req, res, next) => {
  const body = req.body;

  client
    .query(
      `
        insert into images (album_id, title, description, url)
        values ($1, $2, $3, $4)
        returning *, album_id as "albumId";
    `,
      [body.albumId, body.title, body.description, body.url]
    )
    .then(result => {
      res.send(result.rows[0]);
    })
    .catch(next);
});

app.put('/api/images/:id', (req, res, next) => {
  const body = req.body;

  client
    .query(
      `
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
    )
    .then(result => {
      res.send(result.rows[0]);
    })
    .catch(next);
});

app.delete('/api/images/:id', (req, res, next) => {
  client
    .query(
      `
        delete from images where id=$1;
    `,
      [req.params.id]
    )
    .then(() => {
      res.send({ removed: true });
    })
    .catch(next);
});

app.get('/api/albums', (req, res, next) => {
  client
    .query(
      `
        select
          a.id, a.title, a.description,
          count(i.id) as "imageCount"
        from albums a
        left join images i
        on a.id = i.album_id
        group by a.id
        order by a.title;
    `
    )
    .then(result => {
      res.send(result.rows);
    })
    .catch(next);
});

app.get('/api/albums/:id', (req, res, next) => {
  const albumPromise = client.query(
    `
        select id, title, description
        from albums a
        where a.id = $1;
    `,
    [req.params.id]
  );

  const imagesPromise = client.query(
    `
        select id, title, description, url
        from images
        where album_id = $1; 
    `,
    [req.params.id]
  );

  Promise.all([albumPromise, imagesPromise])
    .then(results => {
      const albumResult = results[0];
      const imagesResult = results[1];

      if(albumResult.rows.length === 0) {
        res.sendStatus(404);
        return;
      }

      const album = albumResult.rows[0];
      const images = imagesResult.rows;

      album.images = images;

      res.send(album);
    })
    .catch(next);
});

app.post('/api/albums', (req, res, next) => {
  const body = req.body;

  client
    .query(
      `
    insert into albums (title, description)
    values ($1, $2)
    returning *;
  `,
      [body.title, body.description]
    )
    .then(result => {
      res.send(result.rows[0]);
    })
    .catch(next);
});

// eslint-disable-next-line
app.use((err, req, res, next) => {
  console.log('***SERVER ERROR***\n', err);
  let message = 'internal server error';
  if(err.message) message = err.message;
  else if(typeof err === 'string') message = err;
  res.status(500).send({ message });
});

app.listen(3000, () => console.log('server running...'));
