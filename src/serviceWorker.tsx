/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;

const CACHE_NAME = "qrsec-cache-v1";
const urlsToCache = [
    "/",
    "/invite/",
    "/index.html",
    "/manifest.json",
    "/logo192.png",
    "/logo512.png",
    "/favicon_64x64.ico",
    "/favicon_32x32.ico",
    "/favicon_24x24.ico",
    "/favicon_16x16.ico",
    "/QRSec%20logo.svg",
    "/QRSec%20sad%20logo.svg"
];

// Install Event - Caches assets
self.addEventListener('install', (event: ExtendableEvent) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
    self.skipWaiting();
});

// Activate Event - Removes old caches
self.addEventListener('activate', (event: ExtendableEvent) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                    return null;
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch Event - Serve cached files when offline
self.addEventListener('fetch', (event: FetchEvent) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        }).catch(() => {
            return new Response('Offline content not available', {
                status: 503,
                statusText: 'Service Unavailable',
            });
        })
    );
});

// Listen for 'message' event to force update
self.addEventListener('message', (event: ExtendableMessageEvent) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

export const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('/serviceWorker.tsx');
            registration.active?.postMessage({ type: 'SKIP_WAITING' });
        } catch (error) {
        }
    }
};
