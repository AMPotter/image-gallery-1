const URL = 'http://localhost:3000/api';
const IMAGES_URL = `${URL}/images`;
const ALBUMS_URL = `${URL}/albums`;

export function getImages() {
  return fetch(IMAGES_URL, {
    headers: { 'Content-Type': 'application/json' }
  })
    .then(res => res.json());
}

export function addImage(image) {
  return fetch(IMAGES_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(image)
  })
    .then(res => res.json());
}

export function updateImage(image) {
  return fetch(`${IMAGES_URL}/${image.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(image)
  })
    .then(res => res.json());
}

export function removeImage(id) {
  return fetch(`${IMAGES_URL}/${id}`, {
    method: 'DELETE'
  })
    .then(res => res.json());
}

export function getAlbums() {
  return fetch(`${ALBUMS_URL}`, {
    headers: { 'Content-Type': 'application/json' }
  })
    .then(res => res.json());
}

export function getAlbum(id) {
  return fetch(`${ALBUMS_URL}/${id}`, {
    headers: { 'Content-Type': 'application/json' }
  })
    .then(res => res.json());
}

export function addAlbum(album) {
  return fetch(ALBUMS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(album)
  })
    .then(res => res.json());
}

export function removeAlbum(id) {
  return fetch(`${ALBUMS_URL}/${id}`, {
    method: 'DELETE'
  })
    .then(res => res.json());
}