import { cache } from "./src";

const cached = cache("greeting", () => "Hello world", {
  context: { directory: ".cache", filename: "users" },
});

setInterval(function () {
  console.log(cached());
}, 500);
