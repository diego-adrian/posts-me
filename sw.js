self.addEventListener('install', (event) => {
  const eventInstall = new Promise((resolve, reject) => {
    try {
      console.info('[SW] install ...');
      resolve();
    } catch (error) {
      reject(error.message);
    }
  });
  event.waitUntil(eventInstall);
});
self.addEventListener('activate', async (event) => {
  console.info('[SW] Activate ...');
});

self.addEventListener('fetch', (event) => {
  console.info('[SW] Fetch ...');
  event.respondWith(fetch(event.request));
});

self.addEventListener('sync', (event) => {
  console.info('[SW] Sync ...');
});

self-addEventListener('push', (event) => {
  console.info('[SW] Push ...');
});