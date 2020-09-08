self.addEventListener('install', (e) => {
  console.log('---------------INSTALL---------------------');
  console.log(e);
  console.log('------------------------------------');
  self.skipWaiting();
});
self.addEventListener('activate', async (e) => {
  const claim = await self.clients.claim();
  console.log('-------------ACTIVATE-----------------------');
  console.log(claim);
  console.log('------------------------------------');
});

self.addEventListener('fetch', (e) => {
  console.log('------------FETCH------------------------');
  console.log(e);
  console.log('------------------------------------');
  e.respondWith(fetch(e.request));
});