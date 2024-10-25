import authControllers from "@/controllers/auth.controllers";
import { authentication } from "@/middlewares/authentication";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/register", authControllers.register);
authRouter.post("/login", authControllers.login);
authRouter.get("/me", authentication, authControllers.getUserLogged);

export default authRouter;
