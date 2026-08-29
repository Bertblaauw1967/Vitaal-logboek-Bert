const CACHE='vitaal-v10';
const STATIC=['./manifest.webmanifest','./icon-192.png','./icon-512.png'];

self.addEventListener('install',event=>{
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(STATIC)));
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;

  const req=event.request;
  const isNav=req.mode==='navigate' || (req.headers.get('accept')||'').includes('text/html');

  if(isNav){
    event.respondWith(
      fetch(req,{cache:'no-store'})
        .then(res=>res)
        .catch(()=>caches.match('./index.html'))
    );
    return;
  }

  event.respondWith(
    fetch(req)
      .then(res=>{
        const copy=res.clone();
        caches.open(CACHE).then(cache=>cache.put(req,copy));
        return res;
      })
      .catch(()=>caches.match(req))
  );
});
