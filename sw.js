const CACHE_NAME = 'clinica-sorriso-perfeito-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
    'https://unpkg.com/aos@2.3.1/dist/aos.css',
    'https://unpkg.com/aos@2.3.1/dist/aos.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
];

// Instalação do Service Worker
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// Ativação do Service Worker
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Interceptação de requisições
self.addEventListener('fetch', function(event) {
    // Ignorar requisições chrome-extension e outros não-HTTP
    if (!event.request.url.startsWith('http')) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                // Clone da requisição
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(
                    function(response) {
                        // Verificar se resposta é válida
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Não fazer cache de requisições chrome-extension
                        if (!event.request.url.startsWith('http')) {
                            return response;
                        }

                        // Clone da resposta
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            }).catch(function(error) {
                                // Ignorar erros de cache
                                console.log('Cache put failed:', error);
                            });

                        return response;
                    }
                ).catch(function() {
                    // Fallback para recursos offline
                    if (event.request.destination === 'image') {
                        return new Response(
                            '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="100%" height="100%" fill="#f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dy=".3em">Imagem não disponível</text></svg>',
                            { headers: { 'Content-Type': 'image/svg+xml' } }
                        );
                    }
                });
            })
    );
});

// Background Sync para WhatsApp messages (se necessário)
self.addEventListener('sync', function(event) {
    if (event.tag === 'whatsapp-sync') {
        event.waitUntil(syncWhatsAppMessages());
    }
});

function syncWhatsAppMessages() {
    // Lógica para sincronizar mensagens pendentes
    return Promise.resolve();
}

// Push notifications (se necessário)
self.addEventListener('push', function(event) {
    const options = {
        body: 'Lembrete: Sua consulta odontológica está chegando!',
        icon: '/icon-192x192.png',
        badge: '/badge-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Ver detalhes',
                icon: '/images/checkmark.png'
            },
            {
                action: 'close',
                title: 'Fechar',
                icon: '/images/xmark.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Clínica Sorriso Perfeito', options)
    );
});
