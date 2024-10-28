import categoryControllers from "@/controllers/category.controllers";
import { authentication } from "@/middlewares/authentication";
import authorization from "@/middlewares/authorization";
import { Router } from "express";

export const categoryRoutes = Router();

categoryRoutes.get("/", categoryControllers.findAll);
categoryRoutes.post("/create", authentication, authorization("ADMIN"), categoryControllers.create);
categoryRoutes.patch("/update/:id", authentication, authorization("ADMIN"), categoryControllers.update);
categoryRoutes.delete("/delete/:id", authentication, authorization("ADMIN"), categoryControllers.delete);
