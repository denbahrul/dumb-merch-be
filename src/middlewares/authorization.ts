import { RoleEnum } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export default function authorization(role: RoleEnum): any {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;

    if (user.role != role) {
      return res.status(403).json({
        message: `Access denied: your role (${user.role}) does not have the necessary permissions to access this resource (requires ${role} role).`,
      });
    }

    next();
  };
}
