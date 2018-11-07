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

// Activate service worker
self.addEventListener('activate', event => {
  console.log('v1 ready');
});

// Add responses to fetch events (referenced: https://matthewcranford.com/restaurant-reviews-app-walkthrough-part-4-service-workers/)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) {
        console.log('Yayers! Found ', event.request, ' in cache');
        return response;
      } else {
        console.log('Oh noess! Could not find ', event.request, ' in cache...');
        return fetch(event.request)
        .then(response => {
          caches.open('v1')
          .then(cache => {
            cache.put(event.request, response);
          }).catch(error => {
            console.log(error);
          });
        })
      }
    })
  );
});