'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "2a9e5c29ca376937c2ee653d81e4fdec",
"version.json": "78349715b76c6e91cea54ea6d4b59959",
"index.html": "7a1de54a9471c3020319a6805ce9e848",
"/": "7a1de54a9471c3020319a6805ce9e848",
"message_base.html": "e16ca5a8d7d3e2d3feea675c3d6799cb",
"main.dart.js": "b7609326aa6cd12271e43d0be6965be7",
"flutter.js": "4b2350e14c6650ba82871f60906437ea",
"croppie/croppie.min.js": "0380ad0a1bbf1f6c55d5c67a7ced16da",
"croppie/croppie.min.css": "415ea4fbd13b4a5b82fd147710709ae2",
"croppie/exif.min.js": "48814126e2cd29ac30e68e012934c6d8",
"favicon.png": "86fac5a7e6ecb4d87ab529bf6d7af41a",
"json/messagebase/message/6.json": "f39cac82d878a44e5028849af3d2f997",
"json/messagebase/message/7.json": "b6b349dc5f8734d7a12082d36159ea6f",
"json/messagebase/message/10.json": "a1466565b6a07358524f017f8cd33135",
"json/messagebase/message/1.json": "9f6e02697d49d3b82adf10dbfeb05585",
"json/messagebase/message/2.json": "36fd25b03bb65ccf8cf3438f9297d006",
"json/messagebase/message/3.json": "82f8bdc63de012fefc6b6c0795a55b41",
"json/messagebase/message/8.json": "7836ab4793cdcd91933a1707f88553d1",
"json/messagebase/message/4.json": "3a9fc4ac1b83aa3a8bd4acb988a5e3c0",
"json/messagebase/message/5.json": "6878cfc0e1ae9d5e536c0fc00c8b75e7",
"json/messagebase/message/9.json": "ab3c1c60cc2f4dcf8ff4fe260b51ee3d",
"json/template/message/20.json": "917239ed7167c42fc11b1e0a9d153115",
"json/template/message/16.json": "956ece064c9399f154449ed7694f3206",
"json/template/message/6.json": "fa62c8486fb9c38e01bf2a7b4581cda9",
"json/template/message/7.json": "9dc41b1f103235ff9de188bc11fd5aeb",
"json/template/message/17.json": "468aa1664d0eae4cd56612c720448abb",
"json/template/message/10.json": "d98f26b22f8ca34c3014f77101dbfb9b",
"json/template/message/1.json": "af907e060a3323ed76903e86413050e1",
"json/template/message/11.json": "a7142db7ecedc86bf09a8324ec2514c1",
"json/template/message/2.json": "c9b9da85f84827831576c919bcdace24",
"json/template/message/12.json": "1c5d79b273656862651f2432842f1080",
"json/template/message/13.json": "6e02bc2ca1040cd5fd3cea1a93cd275f",
"json/template/message/3.json": "11d81a6db192537ca87682c92ebd375b",
"json/template/message/8.json": "9af935d12b8f29dace8c73f972e2fe6d",
"json/template/message/18.json": "22a6778a6e3edd0d8034ba8c5c62965a",
"json/template/message/4.json": "7621ed164ce6830a45ee7a534d91fd50",
"json/template/message/14.json": "bca90aecdebec8c856c4a36a7105f5a2",
"json/template/message/15.json": "8962645c19a4e17c4cf89acac780d22a",
"json/template/message/5.json": "9c799176cd882695e9ad99198e0dca1b",
"json/template/message/19.json": "3f5ea819da884e8b6f00a092a0337dd8",
"json/template/message/9.json": "3562618eb733bbf23b781b68f4daadb5",
"json/template/messageForm/6.json": "a7142db7ecedc86bf09a8324ec2514c1",
"json/template/messageForm/7.json": "6e02bc2ca1040cd5fd3cea1a93cd275f",
"json/template/messageForm/10.json": "3f5ea819da884e8b6f00a092a0337dd8",
"json/template/messageForm/1.json": "8d6ee37083bffa150e38f9e9ec9c4fe6",
"json/template/messageForm/2.json": "fe882e48be99e801760f6ef95b4393ef",
"json/template/messageForm/3.json": "9c799176cd882695e9ad99198e0dca1b",
"json/template/messageForm/8.json": "8962645c19a4e17c4cf89acac780d22a",
"json/template/messageForm/4.json": "9dc41b1f103235ff9de188bc11fd5aeb",
"json/template/messageForm/5.json": "3562618eb733bbf23b781b68f4daadb5",
"json/template/messageForm/9.json": "468aa1664d0eae4cd56612c720448abb",
"scripts.js": "ee3908f262d2099e60a4b70701ce7301",
"style.css": "03717c5846759be4d04eacb56b867163",
"manifest.json": "76c7e7b06e9306910881d0e04b0459d1",
"template.html": "c7037a0268b988c5018d404e2209c86f",
"assets/AssetManifest.json": "ac3e11f30584d38d67d12490b8383f38",
"assets/NOTICES": "4a0c3bc2672cfe7df930c42cc24258d9",
"assets/FontManifest.json": "a4f425f61017da8bf8a92434fe9b1107",
"assets/AssetManifest.bin.json": "756c805a9198cf2d43b3a29454146f5f",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "d2b9011127df869a4c720d2a9528822f",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "9702f680d1717a8e7833551570391c5c",
"assets/fonts/MaterialIcons-Regular.otf": "16497dbd8ad4097bdb9444a7a43bbcac",
"assets/assets/image/ic_common_empty_icon.svg": "3715ece1f057cf6567cdb26b5336f85d",
"assets/assets/image/ic_common_arrowonly_right.svg": "a3c9cf7a5438397c6fb8b4684e889f70",
"assets/assets/image/ic_common_arrowonly_left.svg": "5da5f5f1e508175f6dd0e5cb6fb15759",
"assets/assets/image/ic_common_right.svg": "390aaf0b3c66207e82464f0167b591ac",
"assets/assets/image/btn_common_download_play_only_mark.svg": "b08456f23b07fbd5044ce4f7f962e16e",
"assets/assets/image/logo/LT-messagebase.common-2k8ydI_1.gif": "1bb2624be5ccb29ee943d15d2b5e094b",
"assets/assets/image/logo/LT-messagebase.common-5Weq00_1.gif": "594a6fcd6bd7e68994ac5ba79dc06fa4",
"assets/assets/image/logo/LT-messagebase.common-jUAJX2_1.gif": "3850fa1ee9ad67932773f82387ea3c70",
"assets/assets/image/logo/LT-messagebase.common-YCVd02_1.gif": "9ed531ede72dd9ce05bd2942d640d7c4",
"assets/assets/image/logo/LT-messagebase.common-DdWk6s_1.gif": "6b809f11b041233b53ff3e445428e8a8",
"assets/assets/image/logo/LT-messagebase.common-2Yxt2H_1.gif": "aecce55054ced49501110f09805b9811",
"assets/assets/image/ic_common_left.svg": "de2db54f12ac8c5cfe88658e88696c81",
"assets/assets/image/ic_common_arrowonly_left_logo.svg": "7807a67521c8cb59548c080bb9dd28ee",
"assets/assets/image/ic_common_shelter.svg": "5fb276c1e8c74b4fba22a42ca75dc1d3",
"assets/assets/image/horizontal_split.svg": "de0fd42780c823d0ff8454cf97cfc40f",
"assets/assets/image/ic_common_arrowonly_right_logo.svg": "ef46819d18840e08e8a99a27d8fb9186",
"assets/assets/image/ic_common_error.svg": "8a171075061a7f5f869736bbfc17a0bf",
"assets/assets/image/ic_common_photo.svg": "9c96f7b0ab5dc7578ce08cb2c3ae12b5",
"assets/assets/fonts/NotoSansKR/NotoSansKR-Regular.ttf": "e910afbd441c5247227fb4a731d65799",
"assets/assets/fonts/NotoSansKR/NotoSansKR-Bold.ttf": "671db5f821991c90d7f8499bcf9fed7e",
"canvaskit/skwasm.js": "ac0f73826b925320a1e9b0d3fd7da61c",
"canvaskit/skwasm.js.symbols": "96263e00e3c9bd9cd878ead867c04f3c",
"canvaskit/canvaskit.js.symbols": "efc2cd87d1ff6c586b7d4c7083063a40",
"canvaskit/skwasm.wasm": "828c26a0b1cc8eb1adacbdd0c5e8bcfa",
"canvaskit/chromium/canvaskit.js.symbols": "e115ddcfad5f5b98a90e389433606502",
"canvaskit/chromium/canvaskit.js": "b7ba6d908089f706772b2007c37e6da4",
"canvaskit/chromium/canvaskit.wasm": "ea5ab288728f7200f398f60089048b48",
"canvaskit/canvaskit.js": "26eef3024dbc64886b7f48e1b6fb05cf",
"canvaskit/canvaskit.wasm": "e7602c687313cfac5f495c5eac2fb324",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c"};
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
