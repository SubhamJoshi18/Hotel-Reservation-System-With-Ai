import { App } from "./server";
import envConfig from "./config/env.config";
const serverPort = envConfig.serverPort;
export const app = new App(serverPort);
app.listen();
