const CACHE_NAME = 'cbreak-os-v1';

// Map all core modules and pages to be cached instantly on install
const CORE_ASSETS = [
    './',
    './index.html',
    './escape.html',
    './maze.html',
    './sorter.html',
    './match.html',
    './heap.html',
    './crush.html',
    './assembler.html',
    './rpg.html',
    './arcade.html',
    './manifest.json',
    './icon.svg'
];

// INSTALL STAGE: Open cache storage and load all OS endpoints
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('> Service Worker: Pre-caching OS architecture...');
                return cache.addAll(CORE_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// ACTIVATE STAGE: Clean up any old legacy cache buffers
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('> Service Worker: Purging old cache registers...');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

// FETCH STAGE: Cache-First routing strategy for lightning-fast loads
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            return cachedResponse || fetch(event.request);
        })
    );
});