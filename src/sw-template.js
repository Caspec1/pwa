importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

const cacheNetworkFirst = [
  '/api/auth/renew',
  '/api/events'
]

const cacheFirstNetwork = [
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.css',
  'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css'
]

workbox.routing.registerRoute(
  ({request, url}) => {
    if (cacheNetworkFirst.includes(url.pathname)) return true
    return false
  },
  new workbox.strategies.NetworkFirst()
);

workbox.routing.registerRoute(
  ({request, url}) => {
    if (cacheFirstNetwork.includes(url.href)) return true
    return false
  },
  new workbox.strategies.CacheFirst()
);

// posteos offline

const bgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin('posteos-offline', {
  maxRetentionTime: 24 * 60
});

workbox.routing.registerRoute(
  new RegExp('http://localhost:4000/api/events'),
  new workbox.strategies.NetworkOnly({
    plugins: [bgSyncPlugin]
  }),
  'POST'
);

workbox.routing.registerRoute(
  new RegExp('http://localhost:4000/api/events/'),
  new workbox.strategies.NetworkOnly({
    plugins: [bgSyncPlugin]
  }),
  'DELETE'
);

workbox.routing.registerRoute(
  new RegExp('http://localhost:4000/api/events/'),
  new workbox.strategies.NetworkOnly({
    plugins: [bgSyncPlugin]
  }),
  'PUT'
);
