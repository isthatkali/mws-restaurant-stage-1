// Add cache of resources 
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1')
    .then(cache => {
      return cache.addAll([
        '/',
        '/css/styles.css',
        '/data/restaurants.json',
        '/img/1.jpg',
        '/img/2.jpg',
        '/img/3.jpg',
        '/img/4.jpg',
        '/img/5.jpg',
        '/img/6.jpg',
        '/img/7.jpg',
        '/img/8.jpg',
        '/img/10.jpg',
        '/js/dbhelper.js',
        '/js/main.js',
        '/js/restaurant_info.js',
        '/index.html',
        '/restaurant.html'
      ]);
    })
  );
});

// // Activate service worker
self.addEventListener('activate', event => {
  console.log('v1 ready');
});

// Response to 404 errors
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
    .then(response => {
      if(response.status == 404) {
        return new Response("awh heck, not found!");
      }
      return response;
    }).catch(() => {
      return new Response("well this failed...sorry homies");
    })
  );
});

// Responses to requests (referenced: https://matthewcranford.com/restaurant-reviews-app-walkthrough-part-4-service-workers/)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) return response;
      return fetch(event.request);
    })
  );
});