import mongoose, { Document, Schema } from "mongoose";
import Task from "../types/Task";

// Define the ScheduleEvent schema
const TaskSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  title: String,
  group: String,
});

// Create the Mongoose model for ScheduleEvent
export const TaskModel =
  mongoose.models["Task"] ||
  mongoose.model<Task & Document>("Task", TaskSchema);
