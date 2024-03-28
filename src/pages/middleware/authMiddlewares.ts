import { secretKey } from "@/secret";
import { JwtPayload, verify } from "jsonwebtoken";
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
      const payload = verify(token, secretKey) as JwtPayload;
      req.userId = payload.userId;
      next();
    } catch (error) {
      res.status(401).json({ error: error });
    }
  } else {
    return res.status(401).json({ error: "token is null" });
  }
};
