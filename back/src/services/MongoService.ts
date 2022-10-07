import { Document, MongoClient, ObjectId, OptionalId } from "mongodb";
import { Idable } from "../interfaces/Idable";
import { AbstractStorageService } from "./AbstractStorageService";
import { convertDocToResource } from "./mongo/utils";

export class MongoService extends AbstractStorageService {
  client = new MongoClient(this.url);
  constructor(private resourceName: string, private url: string) {
    super();
    (async () => {
      await this.client.connect();
      console.log("connected to mongo.");
    })();
  }

  async create(newResource: unknown): Promise<string> {
    const result = await this.client
      .db()
      .collection(this.resourceName)
      .insertOne(newResource as OptionalId<Document>);
    const id = result.insertedId.toHexString();
    return id;
  }
  async deleteAll(): Promise<void> {
    await this.client.db().collection(this.resourceName).deleteMany({});
  }

  deleteMany(ids: string[]): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async retrieveAll(): Promise<Idable[]> {
    const documents = await this.client
      .db()
      .collection(this.resourceName)
      .find({})
      .toArray();
    const result = documents.map((doc) => convertDocToResource(doc));
    return result;
  }
  async retrieveOne(id: string): Promise<Idable | undefined> {
    const result = await this.client
      .db()
      .collection(this.resourceName)
      .findOne({ _id: new ObjectId(id) });
    console.log("resultxxx: ", result);
    if (result === null) {
      return undefined;
    }
    return convertDocToResource(result);
  }
}
