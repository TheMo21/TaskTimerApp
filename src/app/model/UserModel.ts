import mongoose, { Document, Schema } from "mongoose";
import ScheduleEvent from "../types/ScheduleEvent";
import User from "../types/User";

// Define the UserSchema schema
const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  events: [{ type: Schema.Types.ObjectId, ref: "ScheduleEvent" }],
});

// Create the Mongoose model for User
export const UserModel =
  mongoose.models["User"] ||
  mongoose.model<User & Document>("User", UserSchema);
