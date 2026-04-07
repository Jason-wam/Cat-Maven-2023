// 缓存名称
const CACHE_NAME = 'resource-cat-v1';

// 需要缓存的资源
const urlsToCache = [
  '.',
  'index.html',
  'assets/app-icon.webp',
  'assets/images/screenshot1.webp',
  'assets/images/screenshot2.webp',
  'assets/images/screenshot3.webp',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// 安装Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('缓存已打开');
        return cache.addAll(urlsToCache);
      })
  );
});

// 激活Service Worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 拦截请求
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 如果找到缓存，返回缓存的资源
        if (response) {
          return response;
        }
        // 否则发起网络请求
        return fetch(event.request)
          .then((response) => {
            // 如果响应无效，直接返回
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            // 克隆响应，一份用于缓存，一份用于返回
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            return response;
          });
      })
  );
});