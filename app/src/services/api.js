const URL = '/api';
const IMAGES_URL = `${URL}/images`;
const ALBUMS_URL = `${URL}/albums`;

function responseHandler(response) {
  if(response.ok) return response.json();
  return response.json().then(err => {
    throw err.message;
  });
}

export function getImages() {
  return fetch(IMAGES_URL, {
    headers: { 'Content-Type': 'application/json' }
  })
    .then(responseHandler);
}

export function addImage(image) {
  return fetch(IMAGES_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(image)
  })
    .then(responseHandler);
}

export function updateImage(image) {
  return fetch(`${IMAGES_URL}/${image.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(image)
  })
    .then(responseHandler);
}

export function removeImage(id) {
  return fetch(`${IMAGES_URL}/${id}`, {
    method: 'DELETE'
  })
    .then(responseHandler);
}

export function getAlbums() {
  return fetch(`${ALBUMS_URL}`, {
    headers: { 'Content-Type': 'application/json' }
  })
    .then(responseHandler);
}

export function getAlbum(id) {
  return fetch(`${ALBUMS_URL}/${id}`, {
    headers: { 'Content-Type': 'application/json' }
  })
    .then(responseHandler);
}

export function addAlbum(album) {
  return fetch(ALBUMS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(album)
  })
    .then(responseHandler);
}

export function removeAlbum(id) {
  return fetch(`${ALBUMS_URL}/${id}`, {
    method: 'DELETE'
  })
    .then(responseHandler);
}