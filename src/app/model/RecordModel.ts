import mongoose, { Schema } from "mongoose";
import RecordType from "../types/RecordType";

const recordSchema = new Schema<RecordType>({
  userId: { type: String, required: true },
  taskTitle: { type: String, required: true },
  taskGroup: { type: String, required: true },
  date: { type: String, required: true },
  duration: { type: String, required: true },
});

const RecordModel =
  mongoose.models["Record"] ||
  mongoose.model<RecordType>("Record", recordSchema);

export default RecordModel;
