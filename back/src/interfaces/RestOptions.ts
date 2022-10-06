type StorageType = "RAM" | "File" | "Mongo";

export interface RestOptions {
  storageType: StorageType;
}
