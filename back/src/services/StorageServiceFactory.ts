import { RestOptions } from "../interfaces/RestOptions";
import { AbstractStorageService } from "./AbstractStorageService";
import { FileService } from "./FileService";
import { RAMService } from "./RAMService";

export class StorageServiceFactory {
  static getInstance(
    resourceName: string,
    options?: RestOptions
  ): AbstractStorageService {
    if (options) {
      switch (options.storageType) {
        case "RAM":
          return new RAMService(resourceName);
        case "File":
          return new FileService(resourceName, options.path);
        case "Mongo":
          throw new Error("todo");
      }
    }
    return new RAMService(resourceName);
  }
}
