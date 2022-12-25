function solution(cacheSize, cities) {
  const CACHE_HIT = 1;
  const CACHE_MISS = 5;

  if (cacheSize === 0) return cities.length * CACHE_MISS;

  const cache = [];
  return cities.reduce((time, city) => {
    city = city.toLowerCase();
    if (cache.includes(city)) {
      cache.splice(cache.indexOf(city), 1);
      cache.push(city);
      return time + CACHE_HIT;
    }
    if (cache.length === cacheSize) cache.shift();
    cache.push(city);
    return time + CACHE_MISS;
  }, 0);
}
