type CacheEntry = { value: unknown; expiresAt: number };

declare global {
  var inMemoryCache: Map<string, CacheEntry> | undefined;
}

function getStore(): Map<string, CacheEntry> {
  if (!global.inMemoryCache) {
    global.inMemoryCache = new Map<string, CacheEntry>();
  }
  return global.inMemoryCache;
}

function nowMs(): number {
  return Date.now();
}

export function cacheGet<T>(key: string): T | undefined {
  const entry = getStore().get(key);
  if (!entry) return undefined;
  if (entry.expiresAt < nowMs()) {
    getStore().delete(key);
    return undefined;
  }
  return entry.value as T;
}

export function cacheSet<T>(key: string, value: T, ttlSeconds = 300): void {
  getStore().set(key, { value, expiresAt: nowMs() + ttlSeconds * 1000 });
}

export function cacheDelete(key: string): void {
  getStore().delete(key);
}

export function cacheDeletePrefix(prefix: string): void {
  const store = getStore();
  for (const key of store.keys()) {
    if (key.startsWith(prefix)) store.delete(key);
  }
}