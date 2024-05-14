import mongoose from "mongoose";
import envConfig from "../config/env.config";
class DatabaseConnection {
  private static _database: DatabaseConnection;

  private constructor() {
    const db_url = envConfig.mongoConnectionString;
    if (db_url) {
      mongoose.connect(db_url);
    }
    this.checkMongooseConnection();
  }

  private checkMongooseConnection() {
    mongoose.connection.on("connected", () => {
      console.log("Database Connection Established");
    });
    // mongoose.connection.on("disconnected", () => {
    //   console.log("Database is Disconnected");
    // });
    // mongoose.connection.on("connected", () => {
    //   console.log("Database Has Encounter An Error");
    // });
  }

  public static async getInstance() {
    if (this._database) {
      return this._database;
    }
    this._database = new DatabaseConnection();
    return (this._database = new DatabaseConnection());
  }
}

export default DatabaseConnection;
