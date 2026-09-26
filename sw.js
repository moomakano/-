const CACHE_NAME = 'study-app-v2026-03';
const urlsToCache = [
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&family=Prompt:wght@400;500;600&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
];

// ติดตั้งและบังคับข้ามสถานะรอเพื่อล้าง Cache เก่าทันที
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// ล้าง Cache เก่าทิ้งเมื่อมีการเปลี่ยนเวอร์ชัน
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// ดึงข้อมูลแบบ Network First (พยายามดึงข้อมูลสดใหม่จากเน็ตก่อนเสมอ ถ้าออฟไลน์ค่อยดึงจาก Cache)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});