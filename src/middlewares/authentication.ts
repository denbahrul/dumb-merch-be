import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authentication(req: Request, res: Response, next: NextFunction): void {
  const authorizationHeader = req.header("Authorization");

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Invalid authorization header" });
    return;
  }

  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Authorization token not found" });
    return;
  }
  try {
    const decoded = jwt.verify(token, (process.env as any).JWT_SCREET_KEY);

    res.locals.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid token" });
    return;
  }
}
