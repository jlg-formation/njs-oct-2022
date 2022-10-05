import { v4 as uuidv4 } from "uuid";
import { Idable } from "../interfaces/Idable";

export class RAMService {
  private static instance: RAMService | undefined;

  resources: Idable[] = [];

  constructor(private resourceName: string) {}

  static getInstance(resourceName: string): RAMService {
    if (RAMService.instance === undefined) {
      RAMService.instance = new RAMService(resourceName);
    }
    return RAMService.instance;
  }

  async create(newResource: unknown): Promise<string> {
    const id = uuidv4();
    const r = { ...(newResource as object), id: id };
    this.resources.push(r);
    return id;
  }

  async deleteAll() {
    this.resources.length = 0;
  }

  async deleteMany(ids: string[]) {
    this.resources = this.resources.filter((r) => !ids.includes(r.id));
  }

  async retrieveAll() {
    return this.resources;
  }
}
