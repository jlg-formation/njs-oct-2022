interface FileOptions {
  storageType: "File";
  path: string;
}
interface RAMOptions {
  storageType: "RAM";
}
interface MongoOptions {
  storageType: "Mongo";
  url: string;
}

interface MongooseOptions {
  storageType: "Mongoose";
  url: string;
}

export type RestOptions =
  | FileOptions
  | RAMOptions
  | MongoOptions
  | MongooseOptions;
