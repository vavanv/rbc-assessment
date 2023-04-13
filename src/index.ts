import * as http from "http";
import dotenv from "dotenv";

import App from "./app";
import { environment } from "./environment";

dotenv.config();

App.set("port", environment.port);
const server = http.createServer(App);
server.listen(environment.port);

server.on("listening", function (): void {
  console.log(`Listening on ${environment.port}`);
});
