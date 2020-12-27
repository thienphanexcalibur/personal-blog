/**
 * Copy tempCache to activeCache
 * @param {JSON} manifest - a list of URls need caching
 * @param {*} tempCache
 * @param {*} activeCache
 * @returns {Promise}
 */
async function copyCache(manifest, tempCache = 'tempCache', activeCache = 'activeCache') {
  // Delete current activeCache in application cache
  await caches.delete(activeCache).then();

  // Open fetched tempCache - prepare to copy to new cache
  const tempCacheKeys = await (await caches.open(tempCache)).keys();

  // Open new activeCache
  const newCache = await caches.open(activeCache);

  // Add all tempCache request to new activeCache
  await Promise.all(tempCacheKeys.map((request) => newCache.add(request)));
  await newCache.put(`https://version/!version_${manifest.version.replace(/\//g, '_')}`, new Response('true'));

  // Garbage Collector- remove tempCache - it's just a temp ;)
  await caches.delete(tempCache).then();
  return newCache;
}
// Credit: Thien Phan
