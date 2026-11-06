// Önce internetten dener, internet yoksa son kaydedilen kopyayı açar.
const ONBELLEK = 'yildiz-v1';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(r).then(res => {
      const kopya = res.clone();
      caches.open(ONBELLEK).then(c => c.put(r, kopya));
      return res;
    }).catch(() => caches.match(r))
  );
});
