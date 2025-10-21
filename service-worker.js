// ==================== SERVICE WORKER - ANEST-APP QMENTUM ====================
// Versão Profissional

const CACHE_VERSION = 'v8.2.0-layout-grid';
const CACHE_NAME = `anest-app-${CACHE_VERSION}`;

// Essential files to cache
const ESSENTIAL_FILES = [
    '/',
    '/index.html',
    '/styles.css',
    '/app-layout-grid.js',
    '/anest-app-20251021165726.js',
    '/firebase-config.js',
    '/rops-data-from-banco.js',
    '/doses-pediatricas-data.js',
    '/calculadoras-definitions.js',
    '/documents-data.js',
    '/logo-anest.png',
    '/manifest.json',
    'https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js',
    'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js',
    'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js',
    'https://www.gstatic.com/firebasejs/9.22.0/firebase-storage-compat.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css'
];

// Install event - cache essential files
self.addEventListener('install', (event) => {
    console.log(`[SW] Installing version ${CACHE_VERSION}...`);
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Caching essential files...');
                return cache.addAll(ESSENTIAL_FILES.map(url => {
                    // Add cache busting for local files
                    if (!url.startsWith('http')) {
                        return `${url}?v=${CACHE_VERSION}`;
                    }
                    return url;
                }));
            })
            .then(() => {
                console.log('[SW] Installation complete!');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[SW] Installation failed:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log(`[SW] Activating version ${CACHE_VERSION}...`);
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME && cacheName.startsWith('anest-app-')) {
                            console.log('[SW] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('[SW] Activation complete!');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip cross-origin requests (except Firebase and FontAwesome CDN)
    if (url.origin !== location.origin && 
        !url.origin.includes('gstatic.com') && 
        !url.origin.includes('cdnjs.cloudflare.com')) {
        return;
    }
    
    // Network-first strategy for Firebase API calls
    if (url.origin.includes('firebaseio.com') || 
        url.origin.includes('googleapis.com') ||
        url.pathname.includes('firebase')) {
        event.respondWith(
            fetch(request)
                .catch(() => {
                    return new Response(JSON.stringify({ error: 'Offline' }), {
                        headers: { 'Content-Type': 'application/json' }
                    });
                })
        );
        return;
    }
    
    // Cache-first strategy for static resources
    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    // Return cached version and update in background
                    fetch(request).then((networkResponse) => {
                        if (networkResponse && networkResponse.status === 200) {
                            caches.open(CACHE_NAME).then((cache) => {
                                cache.put(request, networkResponse);
                            });
                        }
                    }).catch(() => {
                        // Network failed, but we have cache
                    });
                    return cachedResponse;
                }
                
                // Not in cache, fetch from network
                return fetch(request)
                    .then((networkResponse) => {
                        // Cache successful responses
                        if (networkResponse && networkResponse.status === 200) {
                            const responseClone = networkResponse.clone();
                            caches.open(CACHE_NAME).then((cache) => {
                                cache.put(request, responseClone);
                            });
                        }
                        return networkResponse;
                    })
                    .catch((error) => {
                        console.error('[SW] Fetch failed:', error);
                        
                        // Return offline page if available
                        if (request.mode === 'navigate') {
                            return caches.match('/index.html');
                        }
                        
                        return new Response('Offline', { status: 503 });
                    });
            })
    );
});

// Message event - handle commands from clients
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => caches.delete(cacheName))
                );
            }).then(() => {
                event.ports[0].postMessage({ success: true });
            })
        );
    }
});

console.log(`[SW] Service Worker ${CACHE_VERSION} loaded!`);
