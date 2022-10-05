import { v4 as uuidv4 } from "uuid";

export class RAMService {
  private static instance: RAMService | undefined;

  resources: unknown[] = [];

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

  async retrieveAll() {
    return this.resources;
  }
}
