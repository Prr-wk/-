const projectVersion = '1.0';
const staticVersion = 'static-v' + projectVersion;
let ongoingRequests = [];
async function clearOldCaches() {
    console.log('%cservice worker activated', 'color:skyblue;');
    let cacheWhitelist = [staticVersion, 'image-cache'];
    const cacheNames = await caches.keys();
    return Promise.all(cacheNames.map(async cacheName => {
        if (cacheWhitelist.indexOf(cacheName) === -1) {
            await caches.delete(cacheName)
        } else {
            const cache = await caches.open(cacheName);
            const requests = await cache.keys();
            requests.map(async request => {
                const response = await cache.match(request);
                if (response && response.headers.get('Content-Type').indexOf('text/html') !== -1) {
                    await cache.delete(request);
                    console.log(`Deleted cached request with URL:${request.url}from ${cacheName}because its Content-Type is text/html`)
                }
            }
            )
        }
    }
    ))
}
self.addEventListener('install', function(event) {
    self.skipWaiting()
});
self.addEventListener('activate', event => {
    self.clients.claim();
    event.waitUntil(clearOldCaches())
}
);
let assertsRepl = /\.(jpg|jpeg|png|bmp|gif|svg|webp|ico|webm|mp3|js|css)$/;
const isDev = self.location.hostname === 'localhost';
if (isDev) {
    assertsRepl = /\.(jpg|jpeg|png|bmp|gif|svg|webp|ico|webm|mp3)$/
}
self.addEventListener('fetch', async (event) => {
    if (event.request.method !== 'GET' || !event.request.url.startsWith('http') || !event.request.url.match(assertsRepl) || event.request.url.endsWith('config.js')) {
        return
    }
    const controller = new AbortController();
    const signal = controller.signal;
    ongoingRequests.push(controller);
    event.respondWith(handleRequest(event.request, signal))
}
);
async function handleRequest(request, signal) {
    try {
        let response = await caches.match(request);
        if (response) {
            return response
        }
        let networkResponse = await fetch(request, {
            signal,
            mode: 'cors',
            credentials: 'omit'
        });
        if (networkResponse && networkResponse.status === 200) {
            let responseClone = networkResponse.clone();
            const cacheName = request.url.match(/\.(js|css)$/) ? staticVersion : 'image-cache';
            let cache = await caches.open(cacheName);
            cache.put(request, responseClone)
        }
        return networkResponse
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Request was aborted');
            const cacheName = request.url.match(/\.(js|css)$/) ? staticVersion : 'image-cache';
            let cache = await caches.open(cacheName);
            await cache.delete(request)
        } else {
            console.error('An error occurred while processing the request:', error)
        }
        throw error
    } finally {
        ongoingRequests = ongoingRequests.filter(controller => controller.signal !== signal)
    }
}
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting()
    } else if (event.data && event.data.type === 'CLEAR_CACHE') {
        caches.keys().then(cacheNames => {
            return Promise.all(cacheNames.map(cacheName => {
                return caches.delete(cacheName)
            }
            ))
        }
        )
    } else if (event.data && event.data.type === 'CLEAR_CACHE_BY_NAME') {
        caches.keys().then(cacheNames => {
            return Promise.all(cacheNames.map(cacheName => {
                if (cacheName === event.data.cacheName) {
                    return caches.delete(cacheName)
                }
            }
            ))
        }
        )
    } else if (event.data && event.data.type === 'CLEAR_OLD_CACHES') {
        clearOldCaches()
    } else if (event.data && event.data.type === 'CANCEL_REQUESTS') {
        ongoingRequests.forEach(controller => controller.abort());
        ongoingRequests = [];
        console.log('All ongoing requests cancelled')
    }
}
)
