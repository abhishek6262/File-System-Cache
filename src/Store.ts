import { Context } from "./Context";

export interface StoreOptions {
  context: {
    directory: string;
    filename: string;
  };
  ttl?: number;
}

export class Store {
  private context: Context;

  constructor(
    context: StoreOptions["context"],
    private ttl: StoreOptions["ttl"] = 5000
  ) {
    this.context = new Context(context.directory, context.filename);
  }

  delete(key: string) {
    const res = this.context.get();

    delete res[key];

    this.context.set(res);
  }

  get(key: string) {
    const res = this.context.get();

    if (res[key] && res[key].timestamp < Date.now() - this.ttl) {
      this.delete(key);
      return;
    }

    return res[key]?.data;
  }

  set(key: string, value: any) {
    const res = this.context.get();

    res[key] = { data: value, timestamp: Date.now() };

    this.context.set(res);
  }
}
