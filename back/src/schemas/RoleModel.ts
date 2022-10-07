import mongoose from "mongoose";
import { Role } from "../interfaces/Role";

const schema = new mongoose.Schema({ name: String, type: Number });
export const RoleModel = mongoose.model<Role>("Role", schema);
