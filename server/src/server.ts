import express, { Application } from "express";
import DatabaseConnection from "./database/dbConnection";
import initRoutes from "./routes/server.route";
import envConfig from "./config/env.config";
export class App {
  public expressApplication: Application;
  public serverPort: string | undefined;
  constructor(serverPort: string | undefined) {
    this.serverPort = serverPort;
    this.expressApplication = express();
    initRoutes(this.expressApplication);
    this.initDatabaseConnection();
  }

  private async initDatabaseConnection(): Promise<void> {
    await DatabaseConnection.getInstance();
  }

  public async listen(): Promise<void> {
    this.expressApplication.listen(this.serverPort, () => {
      console.log(`Server is running on http://localhost:${this.serverPort}`);
    });
  }
}
