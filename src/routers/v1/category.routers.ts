import categoryControllers from "@/controllers/category.controllers";
import { authentication } from "@/middlewares/authentication";
import { Router } from "express";

export const categoryRoutes = Router();

categoryRoutes.get("/", categoryControllers.findAll);
categoryRoutes.post("/create", authentication, categoryControllers.create);
categoryRoutes.patch("/update/:id", authentication, categoryControllers.update);
categoryRoutes.delete("/delete/:id", authentication, categoryControllers.delete);
