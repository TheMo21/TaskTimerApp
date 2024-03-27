/**
 * Next.js API route handler for managing user authentication.
 * Supports POST method for user login.
 *
 * @param req - Next.js API request object
 * @param res - Next.js API response object
 */
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/app/utils/dbConnect";
import { UserModel } from "@/app/model/UserModel";
import User from "@/app/types/User";
import { sign, verify } from "jsonwebtoken";
import { secretKey } from "@/secret";

/**
 * Next.js API route handler for managing user authentication.
 * Supports POST method for user login.
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
 * Handles POST requests for user login.
 *
 * @param req - Next.js API request object
 * @param res - Next.js API response object
 */
const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const bodyJson = JSON.parse(req.body);
    const { email, password } = bodyJson;

    const user = (await UserModel.findOne({ email: email })) as User | null;
    // Guard for existing users
    if (user && user.password === password) {
      // Generate JWT
      const token = sign({ userId: user.id }, secretKey, { expiresIn: "1h" });
      console.log("token generated");
      // Send JWT as response
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: "Incorrect email or password" });
    }
  } catch (error) {
    // Handle errors during user login
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error);
  }
};
