const CACHE_NAME = 'study-app-v7.3';
const urlsToCache = ['./','./index.html','./manifest.json'];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(urlsToCache)));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});

self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
});

self.addEventListener('message', async (event)=>{
  if(event.data?.type!=='SHOW_NOTIFICATION') return;
  const p=event.data.payload||{};
  await self.registration.showNotification(p.title||'ตารางเรียน',{
    body:p.body||'',
    icon:'https://cdn-icons-png.flaticon.com/512/3429/3429149.png',
    badge:'https://cdn-icons-png.flaticon.com/512/3429/3429149.png',
    tag:'study-reminder',
    renotify:true
  });
});

self.addEventListener('notificationclick', event=>{
  event.notification.close();
  event.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{
    for(const c of list){ if('focus' in c) return c.focus(); }
    return clients.openWindow('./');
  }));
});
