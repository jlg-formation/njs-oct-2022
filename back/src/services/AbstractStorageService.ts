import EventEmitter from "events";
import { Idable } from "../interfaces/Idable";

export abstract class AbstractStorageService extends EventEmitter {
  isReady = false;
  abstract create(newResource: any): Promise<string>;
  abstract deleteAll(): Promise<void>;
  abstract deleteMany(ids: string[]): Promise<void>;
  abstract retrieveAll(): Promise<Idable[]>;
  abstract retrieveOne(id: string): Promise<Idable | undefined>;
}
