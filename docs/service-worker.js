const m = [
  "/_app/immutable/chunks/0-899ce9a5.js",
  "/_app/immutable/chunks/1-a05c0897.js",
  "/_app/immutable/chunks/2-8b90ddb2.js",
  "/_app/immutable/chunks/3-e5308f68.js",
  "/_app/immutable/assets/HTMLPreview-0d24e5da.css",
  "/_app/immutable/chunks/HTMLPreview-d8b21788.js",
  "/_app/immutable/chunks/_layout-da46b06b.js",
  "/_app/immutable/chunks/index-71936449.js",
  "/_app/immutable/chunks/singletons-228a5c53.js",
  "/_app/immutable/chunks/stores-eb5cf413.js",
  "/_app/immutable/start-061e7571.js",
  "/_app/immutable/components/error.svelte-d45d2747.js",
  "/_app/immutable/assets/_layout-32e929c2.css",
  "/_app/immutable/modules/pages/_layout.js-9cbb603b.js",
  "/_app/immutable/components/pages/_layout.svelte-a9bd6fbc.js",
  "/_app/immutable/assets/_page-dfa854c9.css",
  "/_app/immutable/components/pages/_page.svelte-90c41a04.js",
  "/_app/immutable/components/pages/channel/_page.svelte-d194e74b.js"
], h = [
  "/.nojekyll",
  "/favicon.png",
  "/logo_512.png",
  "/manifest.json"
], o = "1676637121230", i = `cache_${o}`, p = m.concat(h), r = new Set(p);
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(i).then((s) => s.addAll(p)).then(() => {
      self.skipWaiting();
    }).catch(console.error)
  );
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(async (s) => {
      for (const t of s)
        t !== i && await caches.delete(t);
      self.clients.claim();
    }).catch(console.error)
  );
});
async function u(e) {
  const s = await caches.open(`offline_${o}`);
  try {
    const t = await fetch(e);
    return s.put(e, t.clone()), t;
  } catch (t) {
    const a = await s.match(e);
    if (a)
      return a;
    throw t;
  }
}
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || e.request.headers.has("range"))
    return;
  const s = new URL(e.request.url), t = s.protocol.startsWith("http"), a = s.hostname === self.location.hostname && s.port !== self.location.port, c = s.host === self.location.host, n = c && r.has(s.pathname), l = e.request.cache === "only-if-cached" && !n;
  t && c && !a && !l && e.respondWith(
    (async () => n && await caches.match(e.request) || u(e.request))()
  );
});
