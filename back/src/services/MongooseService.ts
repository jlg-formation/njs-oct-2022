import { Document, MongoClient, ObjectId, OptionalId } from "mongodb";
import mongoose from "mongoose";
import { Idable } from "../interfaces/Idable";
import { sleep } from "../utils";
import { WebServer } from "../WebServer";
import { AbstractStorageService } from "./AbstractStorageService";
import { convertDocToResource } from "./mongo/utils";

export class MongooseService extends AbstractStorageService {
  constructor(
    webServer: WebServer,
    private resourceName: string,
    url: string,
    private model: mongoose.Model<any>
  ) {
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

  async create(newResource: any): Promise<string> {
    const m = new this.model(newResource);
    await m.save();
    console.log("m after save: ", m);
    const id = m._id.toHexString();
    console.log("id: ", id);
    return id;
  }
  async deleteAll(): Promise<void> {
    await this.model.deleteMany({});
  }
  deleteMany(ids: string[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async retrieveAll(): Promise<Idable[]> {
    const array = await this.model.find({}).select("-__v").exec();
    console.log("array: ", array);
    const resources = array.map((item) => convertDocToResource(item._doc));
    console.log("resources: ", resources);
    return resources;
  }
  async retrieveOne(id: string): Promise<Idable | undefined> {
    try {
      const result = await this.model.findById(id).select("-__v").exec();
      console.log("result: ", result);
      const resource = convertDocToResource(result._doc);
      console.log("resource: ", resource);
      return resource;
    } catch (err) {
      return undefined;
    }
  }
}
