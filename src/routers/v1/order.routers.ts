import orderControllers from "@/controllers/order.controllers";
import { Router } from "express";

export const orderRoutes = Router();

orderRoutes.post("/", orderControllers.checkout);
orderRoutes.get("/", orderControllers.getAllOrder);
