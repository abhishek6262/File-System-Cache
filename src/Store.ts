import fs from "fs";

export class Store {
  constructor(private context: string, private ttl: number) {
    if (!fs.existsSync(context)) fs.writeFileSync(context, JSON.stringify({}));
  }

  delete(key: string) {
    let res = JSON.parse(fs.readFileSync(this.context, "utf-8"));

    if (res[key]) {
      delete res[key];
      fs.writeFileSync(this.context, JSON.stringify(res));
    }
  }

  get(key: string) {
    const res = JSON.parse(fs.readFileSync(this.context, "utf-8"));

    if (res[key]) {
      if (res[key].timestamp > Date.now() - this.ttl) return res[key].data;
      else this.delete(key);
    }

    return;
  }

  set(key: string, value: any) {
    const data = JSON.parse(fs.readFileSync(this.context, "utf-8"));

    fs.writeFileSync(
      this.context,
      JSON.stringify(
        Object.assign(data, {
          [key]: {
            data: value,
            timestamp: Date.now(),
          },
        })
      )
    );
  }
}
