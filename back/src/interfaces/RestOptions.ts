interface FileOptions {
  storageType: "File";
  path: string;
}
interface RAMOptions {
  storageType: "RAM";
}
interface DBOptions {
  storageType: "Mongo";
  url: string;
}

export type RestOptions = FileOptions | RAMOptions | DBOptions;
