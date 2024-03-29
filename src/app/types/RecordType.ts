import { Document } from "mongodb";

export default interface Record extends Document {
  userId: string;
  taskTitle: string;
  taskGroup: string;
  date: string;
  duration: string;
}
