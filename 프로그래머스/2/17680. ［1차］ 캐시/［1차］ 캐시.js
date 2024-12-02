class LRUCache {
  #CACHE_HIT = 1;
  #CACHE_MISS = 5;

  constructor(cacheSize) {
    this.cacheSize = cacheSize;
    this.cache = new Map();
  }

  get(key) {
    key = this.#normalizeKey(key);

    if (this.cache.has(key)) {
      this.#cacheHit(key);
      return this.#CACHE_HIT;
    } else {
      this.#cacheMiss(key);
      return this.#CACHE_MISS;
    }
  }

  #normalizeKey(key) {
    return key.toLowerCase();
  }

  #cacheHit(key) {
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
  }

  #cacheMiss(key) {
    if (this.cacheSize === 0) return;
    if (this.#isCacheFull()) this.#removeOldestKey();

    this.cache.set(key, true);
  }

  #isCacheFull() {
    return this.cache.size === this.cacheSize;
  }

  #removeOldestKey() {
    const oldestKey = this.cache.keys().next().value;
    this.cache.delete(oldestKey);
  }
}

function solution(cacheSize, cities) {
  const cache = new LRUCache(cacheSize);
  return cities.reduce((totalTime, city) => totalTime + cache.get(city), 0);
}
