import { promises as fs } from "fs";
import { RAMService } from "./RAMService";

export class FileService extends RAMService {
  constructor(resourceName: string, protected path: string) {
    super(resourceName);

    this.read();
  }

  override async create(newResource: unknown): Promise<string> {
    const id = await super.create(newResource);
    this.save();
    return id;
  }

  override async deleteAll(): Promise<void> {
    await super.deleteAll();
    this.save();
  }

  override async deleteMany(ids: string[]): Promise<void> {
    await super.deleteMany(ids);
    this.save();
  }

  protected async read() {
    try {
      const str = await fs.readFile(this.path, { encoding: "utf-8" });
      this.resources = JSON.parse(str);
    } catch (err) {
      this.resources = [];
    }
  }

  protected async save() {
    await fs.writeFile(this.path, JSON.stringify(this.resources, null, 2));
  }
}
