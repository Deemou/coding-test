function solution(cacheSize, cities) {
  const CACHE_HIT = 1;
  const CACHE_MISS = 5;
  const cache = new Set();
  const cacheQueue = [];

  if (cacheSize === 0) return cities.length * CACHE_MISS;

  return cities.reduce((time, city) => {
    city = city.toLowerCase();
    if (cache.has(city)) {
      cacheQueue.splice(cacheQueue.indexOf(city), 1);
      cacheQueue.push(city);

      return time + CACHE_HIT;
    }

    if (cache.size === cacheSize) cache.delete(cacheQueue.shift());

    cache.add(city);
    cacheQueue.push(city);

    return time + CACHE_MISS;
  }, 0);
}
