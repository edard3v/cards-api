import { app } from "app/app";
import { PORT } from "app/config";

const server = Bun.serve({
  port: PORT,
  fetch: app.fetch,
});

console.log(`Listening on http://localhost:${server.port}`);
