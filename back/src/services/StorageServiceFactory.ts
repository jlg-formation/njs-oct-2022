import { RestOptions } from "../interfaces/RestOptions";
import { AbstractStorageService } from "./AbstractStorageService";
import { RAMService } from "./RAMService";

export class StorageServiceFactory {
  static getInstance(
    resourceName: string,
    options?: Partial<RestOptions>
  ): AbstractStorageService {
    if (options && options.storageType) {
      switch (options.storageType) {
        case "RAM":
          return new RAMService(resourceName);
        case "File":
          throw "todo";
        case "Mongo":
          throw "todo";
        default:
          throw new Error(
            "Storage Type not recognized: " + options.storageType
          );
      }
    }
    return new RAMService(resourceName);
  }
}
