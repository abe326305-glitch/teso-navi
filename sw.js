// Service Worker for 大人の本格手相＆姓名判断ナビ 3D (PWA)
// v4: 常に最新を優先（ネットワーク優先）＋オフライン時のみキャッシュ
const CACHE_NAME = 'teso-navi-cache-v4.1';
const STATIC_ASSETS = [
  './', './index.html', './manifest.json', './favicon.ico', './favicon.png',
  './icon-192.png', './icon-512.png', './apple-touch-icon.png',
  './kanji_strokes.js', './name_divination.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.allSettled(STATIC_ASSETS.map((u) => cache.add(u)))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // CDN等はブラウザに任せる
  event.respondWith(
    fetch(req).then((res) => {
      if (res && res.status === 200) {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((c) => c.put(req, copy)).catch(() => {});
      }
      return res;
    }).catch(() =>
      caches.match(req).then((hit) => hit || caches.match('./index.html'))
    )
  );
});
