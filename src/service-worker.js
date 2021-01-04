/* Precache assets required to load landing page */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.setConfig({
  debug: true,
});
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

/* Listen to service worker updates and skip waiting automatically on client devices */
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

/* NetworkFirst: fetch from network first before attempting to retrieve resource from cache */
workbox.routing.registerRoute(
  new RegExp("https://api.openweathermap.org/(.*)"),
  new workbox.strategies.NetworkFirst({
    cacheName: "weatherapi",
    method: "GET",
    cacheableResponse: { statuses: [200] },
  })
);

/* CacheFirst: fetch from cache first and only attempts to fetch from network if resource is not in cache */
workbox.routing.registerRoute(
  new RegExp("https://fonts.(?:googleapis|gstatic).com/(.*)"),
  new workbox.strategies.CacheFirst({
    cacheName: "googleapis",
    method: "GET",
    cacheableResponse: { statuses: [0, 200] },
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
      }),
    ],
  })
);

/* StaleWhileRevalidate: fetch from cache first and network in parallel then uses cached response if available */
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "images",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);

/* Service worker listens to push notification events sent from network */
let clickUrl;
self.addEventListener("push", (event) => {
  const msg = event.data.text();
  clickUrl = "https://www.google.com/";

  const options = {
    body: msg.body,
    icon: "./assets/notification-icon.png",
    image: "./assets/notification-image.gif",
    vibrate: [200, 100, 200, 100, 200, 100, 200],
    tag: "vibration-sample",
  };
  event.waitUntil(
    self.registration.showNotification("Xavier Poked You", options)
  );
});

self.addEventListener("notificationclick", (event) => {
  const notification = event.notification;
  notification.close();
  if (clickUrl) {
    const promiseChain = clients.openWindow(clickUrl);
    event.waitUntil(promiseChain);
  }
});
