importScripts('/sw-lib/idb.js');
importScripts('config.js');

var CACHE_NAME = 'restaurant-reviews-cache-v1';
var urlsToCache = [
  '/',
  'index.html',
  'restaurant.html',
  'css/styles.css',
  'dist/index.js',
  'dist/restaurant.js',
  'svg/star.svg',
  'icons/favicon-32x32.png',
  'icons/favicon-16x16.png',
  'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css',
  'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700',
];

self.addEventListener('install', function (event) {
  event.waitUntil(
      caches.open(CACHE_NAME).then(function (cache) {
        return cache.addAll(urlsToCache);
      }).catch(function (error) {
        console.log('Error on cache open', error);
      })
  );
});

self.addEventListener('fetch', function (event) {
  /* Map assets */
  if (event.request.url.indexOf('reviews') !== -1 ||
      event.request.url.indexOf('https://maps.googleapis.com/maps/api/js') === 0 ||
      event.request.url.indexOf('mapfiles/') > 0 ||
      event.request.url.indexOf('maps/vt') > 0 ||
      event.request.url.indexOf('maps-api-v3/api/') > 0) {
    event.respondWith(
        fetch(event.request).then(function (response) {
          return response;
        }).catch(function () {
          return new Response();
        })
    )
  } else {
    event.respondWith(
        caches.match(event.request).then(function (cacheResponse) {
          return cacheResponse || fetch(event.request).then(function (networkResponse) {
            return caches.open(CACHE_NAME).then(function (cache) {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            }).catch(function (error) {
              console.log('Error on cache open', error);
            })
          }).catch(function (error) {
            console.log('Error on fetch', error);
          })
        }).catch(function (error) {
          console.log('Cache match error', error);
        })
    );
  }
});

/**
 * Background sync of review
 *
 * Made learning this beautiful article about Background Sync
 * https://www.twilio.com/blog/2017/02/send-messages-when-youre-back-online-with-service-workers-and-background-sync.html
 */
self.addEventListener('sync', function (event) {
  if (event.tag === 'pending-reviews') {
    event.waitUntil(addReview());
  }
});

function addReview() {
  return idb.open('mws-pending-reviews', 1)
    .then(function (db) {
      var transaction = db.transaction('pending-reviews', 'readonly');
      return transaction.objectStore('pending-reviews').getAll();
    })
    .then(function (reviews) {
      return Promise.all(reviews.map(function (review) {
        var config = {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(review),
        };

        return fetch(self.CONFIG.HOST + 'reviews/', config)
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            console.log('Review added', response);

            idb.open('mws-pending-reviews', 1)
              .then(function (db) {
                console.log('Review removed from IDB', response);
                var transaction = db.transaction('pending-reviews', 'readwrite');
                return transaction.objectStore('pending-reviews').delete(review.restaurant_id);
              })
          })
          .catch((error) => {
            console.error(error);
          });
      }));
    });
}