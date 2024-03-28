import { Document } from "mongodb";

export default interface Task extends Document {
  userId: string;
  title: string;
  group: string;
}
