import userControllers from "@/controllers/user.controllers";
import { authentication } from "@/middlewares/authentication";
import { Router } from "express";

export const userRouter = Router();

userRouter.get("/", authentication, userControllers.getProfile);
userRouter.patch("/update", authentication, userControllers.updateProfile);
