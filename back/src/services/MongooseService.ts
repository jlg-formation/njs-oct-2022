import { Document, MongoClient, ObjectId, OptionalId } from "mongodb";
import mongoose from "mongoose";
import { Idable } from "../interfaces/Idable";
import { sleep } from "../utils";
import { WebServer } from "../WebServer";
import { AbstractStorageService } from "./AbstractStorageService";
import { convertDocToResource } from "./mongo/utils";

export class MongooseService extends AbstractStorageService {
  constructor(webServer: WebServer, private resourceName: string, url: string) {
    super();
    (async () => {
      await sleep(1);
      await mongoose.connect(url);
      console.log("connected to mongoose.");
      this.isReady = true;
      this.emit("isReady");
    })();

    webServer.server.on("close", async () => {
      await mongoose.connection.close();
      console.log("mongoose disconnected.");
    });
  }

  create(newResource: any): Promise<string> {
    throw new Error("Method not implemented.");
  }
  deleteAll(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteMany(ids: string[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
  retrieveAll(): Promise<Idable[]> {
    throw new Error("Method not implemented.");
  }
  retrieveOne(id: string): Promise<Idable | undefined> {
    throw new Error("Method not implemented.");
  }
}
