import { Router } from "express";
import authRouter from "./v1/auth.routers";

export const routerV1 = Router();

routerV1.use("/auth", authRouter);
