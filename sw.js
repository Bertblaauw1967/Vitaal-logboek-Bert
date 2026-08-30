// LeefKracht 30.2 - cachevrij
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil((async()=>{try{const k=await caches.keys();await Promise.all(k.map(x=>caches.delete(x)));await self.registration.unregister()}catch(e){}})()));
self.addEventListener('fetch',()=>{});
