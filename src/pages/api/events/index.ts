import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/app/utils/dbConnect";
import { ScheduleEventModel } from "@/app/model/ScheduleEventModel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const bodyJson = JSON.parse(req.body);

      //Guard for requests without proper fields
      if (
        !(bodyJson.id && bodyJson.title && bodyJson.deadline && bodyJson.tasks)
      ) {
        res.status(400).json({ error: "Bad request" });
        return;
      }

      const { id, title, deadline, tasks } = bodyJson;

      // Create a new ScheduleEvent document
      const newScheduleEvent = await ScheduleEventModel.create({
        id: id,
        title: title,
        deadline: deadline,
        tasks: tasks,
      });

      res.status(201).json(newScheduleEvent);
    } catch (error) {
      console.error("Error saving ScheduleEvent:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "GET") {
    //Get all scheduleEvents from database
    const scheduleEvents = await ScheduleEventModel.find();

    res.status(200).json(scheduleEvents);
  } else if (req.method === "DELETE") {
    try {
      const eventId = JSON.parse(req.body).id;
      // Attempt to find the event by ID and delete it
      const deletedEvent = await ScheduleEventModel.findOneAndDelete({
        id: eventId,
      });

      if (!deletedEvent) {
        // If the event with the given ID is not found, return a 404 status
        return res.status(404).json({ error: "Event not found" });
      }

      // If the event is successfully deleted, return a success message
      res.json({ message: "Event deleted successfully" });
    } catch (error) {
      // Handle any errors that occur during the deletion process
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
