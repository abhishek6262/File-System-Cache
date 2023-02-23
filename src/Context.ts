import fs from "fs";
import path from "path";

function ensureContext(path: string) {
  if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify({}));
}

export class Context {
  private path: string;

  constructor(directory: string, filename: string) {
    this.path = path.resolve(directory, filename);

    ensureContext(this.path);
  }

  get() {
    const res = fs.readFileSync(this.path, "utf-8");

    try {
      return JSON.parse(res);
    } catch {}

    return {};
  }

  set<T extends object>(data: T) {
    fs.writeFileSync(this.path, JSON.stringify(data), "utf-8");
  }
}
