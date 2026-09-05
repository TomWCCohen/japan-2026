/* Minimal app-shell service worker.
   Bump CACHE_NAME on every deploy so old clients pick up the new shell. */
const CACHE_NAME = "japon2026-shell-v1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./js/data.js",
  "./js/storage.js",
  "./js/app.js",
  "./icons/icon-180.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-512-maskable.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    ).then(() => self.clients.claim())
  );
});

/* Cache-first for the app shell, falling back to network (and caching
   what we fetch) for anything else — keeps the app usable offline even
   mid-trip with no connectivity. */
self.addEventListener("fetch", (event) => {
  if(event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if(cached) return cached;
      return fetch(event.request)
        .then((response) => {
          if(response && response.status === 200 && response.type === "basic"){
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => caches.match("./index.html"));
    })
  );
});
