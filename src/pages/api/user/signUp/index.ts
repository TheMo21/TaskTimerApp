import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/app/utils/dbConnect";
import { UserModel } from "@/app/model/UserModel";

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
      case "POST":
        await handlePostRequest(req, res);
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
    const { username, email, password } = bodyJson;

    // Guard for existing users
    if (await UserModel.exists({ email: email })) {
      res.status(409).json({ error: "User with the email already exists" });
      return;
    }

    // Create a new ScheduleEvent document
    const newUser = await UserModel.create({
      username,
      email,
      password,
      //TODO add empty array
    });

    res.status(201).json(newUser);
  } catch (error) {
    // Handle errors during the creation of a new schedule event
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
