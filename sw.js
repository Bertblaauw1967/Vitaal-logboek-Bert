/* Mijn LeefRitme 39.25 — stabiele, cache-arme service worker. */
self.addEventListener('install', event => { self.skipWaiting(); });
self.addEventListener('activate', event => {
  event.waitUntil((async()=>{
    try{
      const keys=await caches.keys();
      await Promise.all(keys.map(k=>caches.delete(k)));
    }catch(e){}
    await self.clients.claim();
  })());
});
self.addEventListener('message', event => {
  if(event.data && event.data.type==='SKIP_WAITING') self.skipWaiting();
});
self.addEventListener('fetch', event => {
  if(event.request.method!=='GET') return;
  event.respondWith(fetch(event.request));
});
