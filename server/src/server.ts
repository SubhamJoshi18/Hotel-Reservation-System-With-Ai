import express, { Application } from "express";
import DatabaseConnection from "./database/dbConnection";
import { initializeMiddleware } from "./middleware/server.middleware";
import initRoutes from "./routes/server.route";
import envConfig from "./config/env.config";
export class App {
  public expressApplication: Application;
  public serverPort: string | undefined;
  constructor(serverPort: string | undefined) {
    this.serverPort = serverPort;
    this.expressApplication = express();
    initializeMiddleware(this.expressApplication);
    initRoutes(this.expressApplication);
  }

  private async initDatabaseConnection(): Promise<void> {
    await DatabaseConnection.getInstance();
  }

  public async listen(): Promise<void> {
    await this.initDatabaseConnection();
    this.expressApplication.listen(this.serverPort, () => {
      console.log(`Server is running on http://localhost:${this.serverPort}`);
    });
  }
}
