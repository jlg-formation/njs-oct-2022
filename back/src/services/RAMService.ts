import { v4 as uuidv4 } from "uuid";
import { Idable } from "../interfaces/Idable";
import { AbstractStorageService } from "./AbstractStorageService";

export class RAMService extends AbstractStorageService {
  resources: Idable[] = [];

  constructor(private resourceName: string) {
    super();
  }

  override async create(newResource: unknown): Promise<string> {
    const id = uuidv4();
    const r = { ...(newResource as object), id: id };
    this.resources.push(r);
    return id;
  }

  override async deleteAll() {
    this.resources.length = 0;
  }

  override async deleteMany(ids: string[]) {
    this.resources = this.resources.filter((r) => !ids.includes(r.id));
  }

  override async retrieveAll() {
    return this.resources;
  }

  override async retrieveOne(id: string) {
    return this.resources.find((r) => r.id === id);
  }
}
