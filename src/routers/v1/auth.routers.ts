import authControllers from "@/controllers/auth.controllers";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/register", authControllers.register);
authRouter.post("/login", authControllers.login);

export default authRouter;
