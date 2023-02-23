import { Store, StoreOptions } from "./Store";

export function cache<T>(key: string, fn: () => T, options: StoreOptions) {
  const store = new Store(options.context, options.ttl);

  return function (): T {
    let res = store.get(key);

    if (res) return res;

    res = fn();
    store.set(key, res);

    return res;
  };
}
