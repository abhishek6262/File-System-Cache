import path from "path";
import { Store } from "./Store";

interface CacheOptions {
  context: {
    directory: string;
    filename: string;
  };
  ttl: number;
}

function cache<T>(key: string, fn: () => T, options: CacheOptions) {
  const context = path.resolve(
    options.context.directory,
    options.context.filename
  );
  const store = new Store(context, options.ttl);

  return function (): T {
    let res = store.get(key);

    if (res) return res;

    res = fn();
    store.set(key, res);

    return res;
  };
}

const cacher = cache(
  "greeting",
  function () {
    return "Hello world";
  },
  {
    context: {
      directory: "./.cache",
      filename: "users.json",
    },
    ttl: 50000,
  }
);

cacher();
