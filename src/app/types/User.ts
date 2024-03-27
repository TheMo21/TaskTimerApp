import { Types } from "mongoose";
import ScheduleEvent from "./ScheduleEvent";
import { Document } from "mongodb";

export default interface User extends Document {
  username: string;
  email: string;
  password: string;
  events: string[];
}
