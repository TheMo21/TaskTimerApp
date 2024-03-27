import { secretKey } from "@/secret";
import { verify } from "jsonwebtoken";
import { NextApiResponse } from "next";

export const authenticateToken = (
  req: any,
  res: NextApiResponse,
  next: () => void
) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (authHeader) {
    const token = authHeader && authHeader.split(" ")[1];

    try {
      const userId = verify(token, secretKey);
      req.userId = userId;
      next();
    } catch (error) {
      res.status(401).json({ error: error });
    }
  } else {
    return res.status(401).json({ error: "token is null" });
  }
};
