export const clearCache = async () => {
  const baseCache = await caches.open('base-cache');
  return await baseCache.delete('/', { ignoreSearch: true });
};
