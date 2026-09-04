// Mijn LeefRitme 39.01 - update/cache reset
const SW_VERSION = '39.02';

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => caches.delete(k)));
    await self.clients.claim();

    const clients = await self.clients.matchAll({type:'window', includeUncontrolled:true});
    for (const client of clients) {
      client.postMessage({type:'LEEFRITME_VERSION', version:SW_VERSION});
    }
  })());
});

self.addEventListener('message', event => {
  if(event.data && event.data.type === 'SKIP_WAITING'){
    self.skipWaiting();
  }
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if(req.method !== 'GET') return;

  const url = new URL(req.url);
  if(url.origin !== self.location.origin) return;

  if(req.mode === 'navigate' ||
     url.pathname.endsWith('/index.html') ||
     url.pathname.endsWith('/manifest.webmanifest') ||
     url.pathname.endsWith('/sw.js')) {
    event.respondWith(
      fetch(req, {cache:'no-store'}).catch(() => fetch(req))
    );
  }
});
