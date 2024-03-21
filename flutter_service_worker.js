'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {".git/COMMITMESSAGE": "3ac340832f29c11538fbe2d6f75e8bcc",
".git/COMMIT_EDITMSG": "01eb2c11c2685e04a0e3b0556549b914",
".git/config": "547d2e06b5a866b7c693cc72ae68ffe8",
".git/description": "a0a7c3fff21f2aea3cfa1d0316dd816c",
".git/FETCH_HEAD": "097c886156908154d4600e42b8548469",
".git/fork-settings": "f07f8cfdbfbfddbbc0f7294eac8443d7",
".git/HEAD": "5da174788b6bdea7605a1d0243e7b086",
".git/hooks/applypatch-msg.sample": "ce562e08d8098926a3862fc6e7905199",
".git/hooks/commit-msg.sample": "579a3c1e12a1e74a98169175fb913012",
".git/hooks/fsmonitor-watchman.sample": "a0b2633a2c8e97501610bd3f73da66fc",
".git/hooks/post-update.sample": "2b7ea5cee3c49ff53d41e00785eb974c",
".git/hooks/pre-applypatch.sample": "054f9ffb8bfe04a599751cc757226dda",
".git/hooks/pre-commit.sample": "305eadbbcd6f6d2567e033ad12aabbc4",
".git/hooks/pre-merge-commit.sample": "39cb268e2a85d436b9eb6f47614c3cbc",
".git/hooks/pre-push.sample": "2c642152299a94e05ea26eae11993b13",
".git/hooks/pre-rebase.sample": "56e45f2bcbc8226d2b4200f7c46371bf",
".git/hooks/pre-receive.sample": "2ad18ec82c20af7b5926ed9cea6aeedd",
".git/hooks/prepare-commit-msg.sample": "2b5c047bdb474555e1787db32b2d2fc5",
".git/hooks/push-to-checkout.sample": "c7ab00c7784efeadad3ae9b228d4b4db",
".git/hooks/update.sample": "647ae13c682f7827c22f5fc08a03674e",
".git/index": "88125db77b60e07bd3d6f2bf1640302a",
".git/info/exclude": "036208b4a1ab4a235d75c181e685e5a3",
".git/logs/HEAD": "4827e8d1248305b06e53aeb5810ea59d",
".git/logs/refs/heads/biz_rcs_generator": "1f747b0284677ce083ed9301200aa6f0",
".git/logs/refs/heads/main": "5e33c211385501e789a813d63cdb5603",
".git/logs/refs/remotes/origin/biz_rcs_generator": "282d6dbbfdd32284df3286372b1b33eb",
".git/logs/refs/remotes/origin/HEAD": "5e33c211385501e789a813d63cdb5603",
".git/objects/0d/d68f360843dd0e01085e0a0bcddcf373b557f8": "e140a4b707e03c183f98e00cefdfc064",
".git/objects/14/0102df05c074fdd7b2980b1da644ea46e78a7f": "f4f830f7686eb163027eb5218ae4dc10",
".git/objects/14/ab477abddb95032c5eb75c13b1f4f4e68c6615": "51af623997d817b049dd0e721d1bf634",
".git/objects/18/e02f088c127a941307da32b25b9bf80d830417": "0273890d5dd1d5b25d418eb1a8d2749c",
".git/objects/27/4b6927f02255cad3f703bb233a921a638d8811": "04fe4b4f0ef8371fbd1e74caf8d0da61",
".git/objects/3b/fb10d471fb043d49a9f0a516c244874b27b9e7": "951fd3781f8b02228c7f02479109561b",
".git/objects/44/f3380d19bca0c53631efac2a8b316fc4d00eb0": "0f7c486ef28cd2d0fb022b18027759b2",
".git/objects/47/797d4f9bb3aa43bc81ccb7e9fbc43c90a56be0": "b39abeef18b3dc4224171dcdf215eda8",
".git/objects/4d/181b16b3c446ee78bb09abf8482a18652ea104": "8d23b0c0d4e42977f090539a4cc8a040",
".git/objects/5c/99187d4551c4adfd78bad1275b524f60347352": "b62efd7626a172e1c7906f7f608122bd",
".git/objects/78/22b52208f1ff00ed1a654541cb7db5f07b844f": "a35d024f6537dea605cd670183ca4940",
".git/objects/81/0b4053747652359d52bec7ba7a86aae4029abd": "1b0757f848622f7b8368ae1c04498543",
".git/objects/83/18ca982425c4c61eade0a1bf822e134be76c7f": "d328f7f9c0df1d2fe2f8e6ee47a59c7f",
".git/objects/83/ef4528b5f8c5bb47f05fcd5ac3801b8def2232": "98c225c7b5b0626ce2f28122ee87ed50",
".git/objects/84/119557302c6ae800c5debdd1287cbeae767f76": "a005040a621ef50b65fb1b5e3f613e7c",
".git/objects/88/9cb2c9cd0e4062f2f391adc8cba8d9c417d04b": "04e03442fc71b0ee37fb151a13697857",
".git/objects/90/15389f1dd769ecd5eabdaf0ad8932e44ffc2a3": "9d28bc512dcf836aa942b7b6eed017ba",
".git/objects/a0/f8896f378b6b7a780982961ab927de5d66956c": "3a8fba6708666347980b24966225a5be",
".git/objects/a4/ddcb918b14dff789e22c0f71db369648ee7202": "d15fc9ce054c2f31222554dc285d82e8",
".git/objects/a5/7f659e90681b56d9f5aefb9d4fa26e4bfde11d": "a4e5fe0661e3b29616d8df8743ea51a1",
".git/objects/a6/79cd0853cc7a8b1bb17ced69145fb7ac99618a": "ff3d91e48dd1f4ad77f204db91f46445",
".git/objects/a8/335e3fbfa9561cf4da783a8b4a54c7f75269b1": "5ec08a5af7af51dcfcecf1757b701073",
".git/objects/ab/bf733d3b81cd220adb907909f90d27e1c22aa3": "88183011ee623a204be5be22b9bdbf12",
".git/objects/ab/d91cb5bb87faca36862239ce204222d88084b1": "2412acd3fdfe11979d393d480b7b5e0a",
".git/objects/ac/cd35d4259f4c9a092865f9d38621cb191f1a25": "aaa1d5baac98047c04c462e135b97445",
".git/objects/b1/61b20dbd45ca18c1ece611b3564020ef74962e": "4ae5b93a0d400db59e1436fd9dd305d4",
".git/objects/ba/778b9c3237ca2f931284ae0b7e906986ac4ac4": "754d823dd543a67628f7ef25befb4b40",
".git/objects/bb/85fe5c0b1dbae5fe4132a6ea22cc4c908eb0d5": "a41a37bf8e0089f9cb955809e9999915",
".git/objects/cf/7bffd3ec880c12a5e135935ad532d289458b21": "618482f2717e719176530eaa8c99f05e",
".git/objects/pack/pack-85497e8ae1ca2240b467b935366c7c18c8b3b346.idx": "d727bf37e73af06cd456381f957346ee",
".git/objects/pack/pack-85497e8ae1ca2240b467b935366c7c18c8b3b346.pack": "66002fda07e7a37b81fcbe032c5a50a4",
".git/ORIG_HEAD": "f542a72532b898d5d828ef632a0d3123",
".git/packed-refs": "db5766e955676bdabce86e6cb7d30c19",
".git/refs/heads/biz_rcs_generator": "f542a72532b898d5d828ef632a0d3123",
".git/refs/heads/main": "e9c1928454329692eedb49ddf19c26bc",
".git/refs/remotes/origin/biz_rcs_generator": "f542a72532b898d5d828ef632a0d3123",
".git/refs/remotes/origin/HEAD": "98b16e0b650190870f1b40bc8f4aec4e",
"assets/AssetManifest.bin": "7ebe3e640f68b3f74324b9f6dc26b00c",
"assets/AssetManifest.json": "e2d2fea9b996c2c07f9b17ed665a095f",
"assets/assets/image/arrowonly_left.svg": "923044bf6212c65ecd82b1fb833a366f",
"assets/assets/image/arrowonly_right.svg": "0bd69509ba6a56031caad8573bbe23cc",
"assets/assets/image/btn_common_download_play_only_mark.svg": "6bc6519e6186371b57a36bfda3ec4476",
"assets/assets/image/ic_common_shelter.svg": "42bd45f6be458a62e30aa91c5f3d50b4",
"assets/FontManifest.json": "7b2a36307916a9721811788013e65289",
"assets/fonts/MaterialIcons-Regular.otf": "4a605f5da94f25c87a21ab9601e256e1",
"assets/NOTICES": "4b412f6328242c75227371465bfb4220",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "bbf39143dfd758d8d847453b120c8ebb",
"canvaskit/canvaskit.wasm": "42df12e09ecc0d5a4a34a69d7ee44314",
"canvaskit/chromium/canvaskit.js": "96ae916cd2d1b7320fff853ee22aebb0",
"canvaskit/chromium/canvaskit.wasm": "be0e3b33510f5b7b0cc76cc4d3e50048",
"canvaskit/skwasm.js": "95f16c6690f955a45b2317496983dbe9",
"canvaskit/skwasm.wasm": "1a074e8452fe5e0d02b112e22cdcf455",
"canvaskit/skwasm.worker.js": "51253d3321b11ddb8d73fa8aa87d3b15",
"favicon.png": "86fac5a7e6ecb4d87ab529bf6d7af41a",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"index.html": "237d56f5d93358712c48922a92525e0b",
"/": "237d56f5d93358712c48922a92525e0b",
"json.json": "d6459ff95bf35eb4ad31fd5778a7697e",
"main.dart.js": "0838d2662accd2fbca53bfe9d5e4bd4a",
"manifest.json": "b14aa740171cc625da7fc740d4125bcb",
"scripts.js": "e53e04e41560a37c43f684545c18ce02",
"style.css": "e3e4c1d418849a429aa9e6cc57c7d5dd",
"version.json": "d3072d5a48775d8ca9b33dbb93e37078"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
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
