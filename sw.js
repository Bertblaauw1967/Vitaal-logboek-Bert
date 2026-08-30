// LeefKracht 30.3 cachevrij
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil((async()=>{try{const k=await caches.keys();await Promise.all(k.map(x=>caches.delete(x)));await self.registration.unregister()}catch(x){}})()));
self.addEventListener('fetch',()=>{});
