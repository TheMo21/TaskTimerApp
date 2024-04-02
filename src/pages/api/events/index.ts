import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/app/utils/dbConnect";
import { authenticateToken } from "@/middleware/authMiddlewares";
import { fetchTaskMiddleware } from "@/middleware/fetchTasksMiddleware";
import { TaskModel } from "@/app/model/TaskModel";

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
const handlePostRequest = async (req: any, res: NextApiResponse) => {
  //authenticate JWT token
  authenticateToken(req, res, () => {});
  const userId = req.userId;
  try {
    const bodyJson = JSON.parse(req.body);

    // Guard for requests without proper fields
    if (!bodyJson.title && !bodyJson.group) {
      res.status(400).json({ error: "Bad request" });
      return;
    }

    const { title, group } = bodyJson;

    // Create a new ScheduleEvent document
    const newTask = await TaskModel.create({
      userId,
      title,
      group,
    });
    res.status(201).json(newTask);
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
  await fetchTaskMiddleware(req, res, () => {});
  const tasks = req.tasks;
  res.status(200).json(tasks);
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
    const taskId = JSON.parse(req.body).id;

    // Attempt to find the event by ID and delete it
    const deletedEvent = await TaskModel.findByIdAndDelete(taskId);
    console.log(deletedEvent);
    if (!deletedEvent) {
      // If the event with the given ID is not found, return a 404 status
      return res.status(404).json({ error: "Event not found" });
    }

    // If the event is successfully deleted, return a success message
    res.status(201).json({ message: "Event deleted successfully" });
  } catch (error) {
    // Handle errors during the deletion of a schedule event
    console.error("Error deleting ScheduleEvent:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
