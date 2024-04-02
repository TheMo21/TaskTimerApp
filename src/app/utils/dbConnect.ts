import mongoose from "mongoose";

export default async function dbConnect() {
  const URI =
    "mongodb+srv://admin:Ck3pbHU3ojpwkHY2@event.rowplbn.mongodb.net/?retryWrites=true&w=majority";
  await mongoose.connect(URI);
}
