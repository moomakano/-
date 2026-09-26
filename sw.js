self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>self.clients.claim());
self.addEventListener('push',e=>{const d=e.data?e.data.json():{title:'ตารางเรียน',body:'ถึงเวลาเรียน'};e.waitUntil(self.registration.showNotification(d.title,{body:d.body,icon:'https://cdn-icons-png.flaticon.com/512/3429/3429149.png'}));});