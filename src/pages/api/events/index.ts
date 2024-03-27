import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/app/utils/dbConnect";
import { ScheduleEventModel } from "@/app/model/ScheduleEventModel";
import { verify } from "jsonwebtoken";
import { secretKey } from "@/secret";
import { authenticateToken } from "@/pages/middleware/authMiddlewares";
import { UserModel } from "@/app/model/UserModel";
import { getEvents } from "@/pages/middleware/fetchEventMiddleware";

/**
 * Next.js API route handler for managing schedule events.
 * Supports GET, POST, and DELETE methods.
 *
 * @param req - Next.js API request object
 * @param res - Next.js API response object
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Connect to MongoDB
  await dbConnect();

  try {
    // Switch based on the HTTP method
    switch (req.method) {
      case "GET":
        await handleGetRequest(req, res);
        break;

      case "POST":
        await handlePostRequest(req, res);
        break;

      case "DELETE":
        await handleDeleteRequest(req, res);
        break;

      default:
        // Return 405 Method Not Allowed if the HTTP method is not supported
        res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    // Handle any errors that occur during request processing
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

/**
 * Handles POST requests to create a new schedule event.
 *
 * @param req - Next.js API request object
 * @param res - Next.js API response object
 */
const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const bodyJson = JSON.parse(req.body);

    // Guard for requests without proper fields
    if (
      !(bodyJson.id && bodyJson.title && bodyJson.deadline && bodyJson.tasks)
    ) {
      res.status(400).json({ error: "Bad request" });
      return;
    }

    const { id, title, deadline, tasks } = bodyJson;

    // Create a new ScheduleEvent document
    const newScheduleEvent = await ScheduleEventModel.create({
      id,
      title,
      deadline,
      tasks,
    });

    res.status(201).json(newScheduleEvent);
  } catch (error) {
    // Handle errors during the creation of a new schedule event
    console.error("Error saving ScheduleEvent:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Handles GET requests to retrieve all schedule events.
 *
 * @param req - Next.js API request object
 * @param res - Next.js API response object
 */
const handleGetRequest = async (req: any, res: NextApiResponse) => {
  //authenticate JWT token
  authenticateToken(req, res, () => {});
  await getEvents(req, res, () => {});
  const events = req.events;
  res.status(200).json(events);
};

/**
 * Handles DELETE requests to delete a schedule event by ID.
 *
 * @param req - Next.js API request object
 * @param res - Next.js API response object
 */
const handleDeleteRequest = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
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
    // Handle errors during the deletion of a schedule event
    console.error("Error deleting ScheduleEvent:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
