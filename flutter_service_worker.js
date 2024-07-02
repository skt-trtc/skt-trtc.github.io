'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "ce72b1759234988120f9e4866679bd12",
"assets/AssetManifest.bin.json": "c3ff9792e1c4a2226a984c0e838d1a1b",
"assets/AssetManifest.json": "4012e247bd460548c264bd9385ed9e98",
"assets/assets/fonts/NotoSansKR/NotoSansKR-Bold.ttf": "671db5f821991c90d7f8499bcf9fed7e",
"assets/assets/fonts/NotoSansKR/NotoSansKR-Regular.ttf": "e910afbd441c5247227fb4a731d65799",
"assets/assets/image/btn_common_download_play_only_mark.svg": "6bc6519e6186371b57a36bfda3ec4476",
"assets/assets/image/horizontal_split.svg": "de0fd42780c823d0ff8454cf97cfc40f",
"assets/assets/image/ic_common_arrowonly_left.svg": "923044bf6212c65ecd82b1fb833a366f",
"assets/assets/image/ic_common_arrowonly_left_logo.svg": "f79b695b10d3409357a36a182efd5673",
"assets/assets/image/ic_common_arrowonly_right.svg": "0bd69509ba6a56031caad8573bbe23cc",
"assets/assets/image/ic_common_arrowonly_right_logo.svg": "9157c897aa0705a03bc0d3f1175866b8",
"assets/assets/image/ic_common_empty_icon.svg": "d9f43aa02cabd246337688a9b95b98fb",
"assets/assets/image/ic_common_error.svg": "cb2818b6d864333ec28efe0063b316a3",
"assets/assets/image/ic_common_left.svg": "aaed351281fb40bfccb0b2d3441f9ea8",
"assets/assets/image/ic_common_photo.svg": "08df85e9cd3cea3ee0248a1c15902593",
"assets/assets/image/ic_common_right.svg": "96b6b2e554c2cda42ef8ca9e9dffb9e1",
"assets/assets/image/ic_common_shelter.svg": "42bd45f6be458a62e30aa91c5f3d50b4",
"assets/FontManifest.json": "9e11a2c4c22e34b0a35bc3e7c1e7c30d",
"assets/fonts/MaterialIcons-Regular.otf": "9c2b66d716aa43c00ac15afb3e27253e",
"assets/NOTICES": "ec9084c454144a7a1ba02019cd811ce1",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "738255d00768497e86aa4ca510cce1e1",
"canvaskit/canvaskit.js.symbols": "74a84c23f5ada42fe063514c587968c6",
"canvaskit/canvaskit.wasm": "9251bb81ae8464c4df3b072f84aa969b",
"canvaskit/chromium/canvaskit.js": "901bb9e28fac643b7da75ecfd3339f3f",
"canvaskit/chromium/canvaskit.js.symbols": "ee7e331f7f5bbf5ec937737542112372",
"canvaskit/chromium/canvaskit.wasm": "399e2344480862e2dfa26f12fa5891d7",
"canvaskit/skwasm.js": "5d4f9263ec93efeb022bb14a3881d240",
"canvaskit/skwasm.js.symbols": "c3c05bd50bdf59da8626bbe446ce65a3",
"canvaskit/skwasm.wasm": "4051bfc27ba29bf420d17aa0c3a98bce",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"croppie/croppie.min.css": "415ea4fbd13b4a5b82fd147710709ae2",
"croppie/croppie.min.js": "0380ad0a1bbf1f6c55d5c67a7ced16da",
"croppie/exif.min.js": "48814126e2cd29ac30e68e012934c6d8",
"favicon.png": "86fac5a7e6ecb4d87ab529bf6d7af41a",
"flutter.js": "383e55f7f3cce5be08fcf1f3881f585c",
"flutter_bootstrap.js": "5155f2cbfb89a40a44764911c1a80e15",
"index.html": "7605758f75501794c131777c139d81b2",
"/": "7605758f75501794c131777c139d81b2",
"main.dart.js": "00713710058cb374c39d9635dccd66f1",
"manifest.json": "745a7129751ddb1899295062d5871c41",
"messagebase_json/messagebase1.json": "b18b3a86c1ba427c585d9090512fc08c",
"messagebase_json/messagebase2.json": "40b62148b751a0b0e925ee993d74e218",
"messagebase_json/messagebase3.json": "226ef52a4c05922d4a4eeaa7426539c3",
"messagebase_json/messagebase4.json": "51d15b39e026ad03072022ced17222aa",
"messagebase_json/template1.json": "45aa18edbddec5434161053593194df7",
"messagebase_json/template2.json": "978755bc36dbc1cef09e7d81b83cec38",
"message_base.html": "83258d22fead110357033a2b62a1a911",
"scripts.js": "d75738bdaadd089d230036711f8856fa",
"style.css": "28347638785ccca98e21a977d90d1109",
"template.html": "d82584a25bfb7d7e799beeba82b4e979",
"version.json": "75fe7138ff6b8512e4c5e6f381c0f898"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
