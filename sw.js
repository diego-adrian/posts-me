self.addEventListener('install', (event) => {
  // GUARDAR EN CACHE LOS ARCHIVOS
  console.log('------------------------------------');
  console.log('[SW]: installando service worker');
  console.log('------------------------------------');
  self.skipWaiting();
  // event.waitUntil();
});

self.addEventListener('activate', (event) => {
  // BORRAR CACHE VIEJO
  console.log('------------------------------------');
  console.log('[SW]: Activando SW');
  console.log('------------------------------------');
  // event.waitUntil();
});

self.addEventListener('fetch', (event) => {
  // console.log('------------------------------------');
  // console.log(event.request.url);
  // console.log('------------------------------------');
  event.respondWith(fetch(event.request.clone()));
});

self.addEventListener('sync', (event) => {
  // IndexDB bases de datos
  console.log('------------------------------------');
  console.log(event);
  console.log('------------------------------------');
});