const CACHE_NAME='schedule-v12-2';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(clients.claim());});
self.addEventListener('fetch',event=>{
 if(event.request.mode==='navigate'){
  event.respondWith(fetch(event.request).then(r=>{
    const c=r.clone(); caches.open(CACHE_NAME).then(cache=>cache.put(event.request,c));
    return r;
  }).catch(()=>caches.match(event.request)));
  return;
 }
 event.respondWith(caches.match(event.request).then(c=>c||fetch(event.request)));
});