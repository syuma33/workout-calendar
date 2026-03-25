// before
//const CACHE_NAME = "workout-calendar-v1";

// after
const CACHE_NAME = "workout-calendar-v3";
const FILES_TO_CACHE = [
    ".",
    "index.html",
    "styles.css",
    "app.js",
    "manifest.json",
    "icon.png"
];

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
    );
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(res => res || fetch(e.request))
    );
});