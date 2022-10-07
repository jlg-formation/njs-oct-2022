import { RestOptions } from "../interfaces/RestOptions";
import { WebServer } from "../WebServer";
import { AbstractStorageService } from "./AbstractStorageService";
import { FileService } from "./FileService";
import { MongooseService } from "./MongooseService";
import { MongoService } from "./MongoService";
import { RAMService } from "./RAMService";

export class StorageServiceFactory {
  static getInstance(
    webServer: WebServer,
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
          return new MongoService(webServer, resourceName, options.url);
        case "Mongoose":
          return new MongooseService(webServer, resourceName, options.url);
      }
    }
    return new RAMService(resourceName);
  }
}
