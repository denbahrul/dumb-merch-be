import authControllers from "@/controllers/auth.controllers";
import express, { Express, Request, Response } from "express";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/register", authControllers.register);

export default authRouter;
