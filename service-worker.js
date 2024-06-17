// service-worker.js

// Installation du service worker
self.addEventListener('install', event => {
    console.log('Service Worker installed');
  });
  
  // Activation du service worker
  self.addEventListener('activate', event => {
    console.log('Service Worker activated');
  });
  
  // Gestion des requêtes fetch
  self.addEventListener('fetch', event => {
    console.log('Fetch intercepted for:', event.request.url);
  });
  