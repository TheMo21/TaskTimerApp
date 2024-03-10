import mongoose, { Document, Schema } from "mongoose";
import Task from "../types/Task";
import ScheduleEvent from "../types/ScheduleEvent";

// Define the ScheduleEvent schema
const ScheduleEventSchema = new Schema({
  id: String,
  title: String,
  deadline: String,
  tasks: Array<typeof Task>,
});

// Create the Mongoose model for ScheduleEvent
export const ScheduleEventModel =
  mongoose.models["ScheduleEvent"] ||
  mongoose.model<ScheduleEvent & Document>(
    "ScheduleEvent",
    ScheduleEventSchema
  );
