import { WithId, Document } from "mongodb";
import { Idable } from "../../interfaces/Idable";

export const convertDocToResource = (doc: WithId<Document>): Idable => {
  const object: any = { ...doc };
  object.id = object._id?.toHexString();
  delete object._id;
  console.log("object: ", object);
  return object as Idable;
};
