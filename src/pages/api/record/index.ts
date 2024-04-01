import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/app/utils/dbConnect";
import RecordModel from "@/app/model/RecordModel";
import { authenticateToken } from "@/pages/middleware/authMiddlewares";

/**
 * Next.js API route handler for managing records.
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

      //   case "DELETE":
      //     await handleDeleteRequest(req, res);
      //     break;

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
 * Handles POST requests to create a new record.
 *
 * @param req - Next.js API request object
 * @param res - Next.js API response object
 */
const handlePostRequest = async (req: any, res: NextApiResponse) => {
  // Authenticate JWT token
  authenticateToken(req, res, () => {});
  const userId = req.userId;

  try {
    const bodyJson = JSON.parse(req.body);
    console.log(bodyJson);

    // Guard for requests without proper fields
    if (
      !bodyJson.taskTitle ||
      !bodyJson.taskGroup ||
      !bodyJson.date ||
      !bodyJson.duration
    ) {
      res.status(400).json({ error: "Bad request" });
      return;
    }

    const { taskTitle, taskGroup, date, duration } = bodyJson;

    // Create a new Record document
    const newRecord = await RecordModel.create({
      userId,
      taskTitle,
      taskGroup,
      date,
      duration,
    });

    res.status(201).json(newRecord);
  } catch (error) {
    // Handle errors during the creation of a new record
    console.error("Error saving record:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Handles GET requests to retrieve all records.
 *
 * @param req - Next.js API request object
 * @param res - Next.js API response object
 */
const handleGetRequest = async (req: any, res: NextApiResponse) => {
  // Authenticate JWT token
  authenticateToken(req, res, () => {});

  try {
    // Fetch all records for the authenticated user
    const userId = req.userId;
    const records = await RecordModel.find({ userId });
    res.status(200).json(records);
  } catch (error) {
    // Handle errors during the retrieval of records
    console.error("Error fetching records:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Handles DELETE requests to delete a record by ID.
 *
 * @param req - Next.js API request object
 * @param res - Next.js API response object
 */
// const handleDeleteRequest = async (
//   req: NextApiRequest,
//   res: NextApiResponse
// ) => {
//   try {
//     const recordId = JSON.parse(req.body).id;

//     // Attempt to find the record by ID and delete it
//     const deletedRecord = await RecordModel.findByIdAndDelete(recordId);
//     console.log(deletedRecord);
//     if (!deletedRecord) {
//       // If the record with the given ID is not found, return a 404 status
//       return res.status(404).json({ error: "Record not found" });
//     }

//     // If the record is successfully deleted, return a success message
//     res.json({ message: "Record deleted successfully" });
//   } catch (error) {
//     // Handle errors during the deletion of a record
//     console.error("Error deleting record:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
