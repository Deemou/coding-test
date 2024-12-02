function solution(cacheSize, cities) {
  const CACHE_HIT = 1;
  const CACHE_MISS = 5;
  const cache = [];
  const citySet = new Set();

  if (cacheSize === 0) return cities.length * CACHE_MISS;

  return cities.reduce((time, city) => {
    city = city.toLowerCase();
    if (citySet.has(city)) {
      cache.splice(cache.indexOf(city), 1);
      cache.push(city);

      return time + CACHE_HIT;
    }

    if (citySet.size === cacheSize) citySet.delete(cache.shift());

    citySet.add(city);
    cache.push(city);

    return time + CACHE_MISS;
  }, 0);
}
