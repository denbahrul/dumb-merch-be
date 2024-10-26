import { Router } from "express";
import authRouter from "./v1/auth.routers";
import { userRouter } from "./v1/user.router";

export const routerV1 = Router();

routerV1.use("/auth", authRouter);
routerV1.use("/user", userRouter);
