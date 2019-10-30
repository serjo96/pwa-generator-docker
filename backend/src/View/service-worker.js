importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");
firebase.initializeApp({
    apiKey: "AIzaSyD2HWSU3ahplXr1_O4NtBXjwqKbH7hV4YA",
    authDomain: "play777-fa962.firebaseapp.com",
    databaseURL: "https://play777-fa962.firebaseio.com",
    projectId: "play777-fa962",
    storageBucket: "play777-fa962.appspot.com",
    messagingSenderId: "998804748155",
    appId: "1:998804748155:web:9e419b004ce0e214"
});

const messaging = firebase.messaging();
const DEBUG = true;
const { assets } = global.serviceWorkerOption;
const CACHE_NAME = new Date().toISOString();
let assetsToCache = [...assets, './'];

assetsToCache = assetsToCache.map(path => {
    return new URL(path, global.location).toString();
});

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(assetsToCache))
            .then(() => {
                console.log('Cached assets: main', assetsToCache);
            })
            .catch(error => {
                console.error(error);
                throw error;
            })
    );
});

self.addEventListener('message', event => {
    switch (event.data.action) {
        case 'skipWaiting':
            if (self.skipWaiting) {
                self.skipWaiting();
                self.clients.claim();
            }
            break;
        default:
            break;
    }
});

self.addEventListener('fetch', event => {
    const request = event.request;

    // Ignore not GET request.
    if (request.method !== 'GET') {
        if (DEBUG) {
            console.log(`[SW] Ignore non GET request ${request.method}`);
        }
        return;
    }

    const requestUrl = new URL(request.url)

    // Ignore difference origin.
    if (requestUrl.origin !== location.origin) {
        if (DEBUG) {
            console.log(`[SW] Ignore difference origin ${requestUrl.origin}`)
        }
        return;
    }

    const resource = global.caches.match(request).then(response => {
        if (response) {
            if (DEBUG) {
                console.log(`[SW] fetch URL ${requestUrl.href} from cache`)
            }

            return response;
        }

        // Load and cache known assets.
        return fetch(request)
            .then(responseNetwork => {
                if (!responseNetwork || !responseNetwork.ok) {
                    if (DEBUG) {
                        console.log(
                            `[SW] URL [${requestUrl.toString()}] wrong responseNetwork: ${
                                responseNetwork.status
                                } ${responseNetwork.type}`
                        )
                    }

                    return responseNetwork;
                }

                if (DEBUG) {
                    console.log(`[SW] URL ${requestUrl.href} fetched`)
                }

                const responseCache = responseNetwork.clone();

                global.caches
                    .open(CACHE_NAME)
                    .then(cache => {
                        return cache.put(request, responseCache);
                    })
                    .then(() => {
                        if (DEBUG) {
                            console.log(`[SW] Cache asset: ${requestUrl.href}`)
                        }
                    });

                return responseNetwork;
            })
            .catch(() => {
                // User is landing on our page.
                if (event.request.mode === 'navigate') {
                    return global.caches.match('./')
                }

                return null
            })
    })

    event.respondWith(resource);
});

self.addEventListener('notificationclick', event => {
    const rootUrl = new URL('/', location).href;
    event.notification.close();
    // Enumerate windows, and call window.focus(), or open a new one.
    event.waitUntil(
        clients.matchAll().then(matchedClients => {
            for (let client of matchedClients) {
                if (client.url === rootUrl) {
                    return client.focus();
                }
            }
            return clients.openWindow("/");
        })
    );
});
