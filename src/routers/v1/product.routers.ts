import categoryControllers from "@/controllers/category.controllers";
import productControllers from "@/controllers/product.controllers";
import { authentication } from "@/middlewares/authentication";
import authorization from "@/middlewares/authorization";
import upload from "@/middlewares/upload-file";
import { Router } from "express";

export const productRoutes = Router();

productRoutes.get("/", productControllers.findAll);
productRoutes.get("/:id", productControllers.findById);
productRoutes.post("/create", authentication, authorization("ADMIN"), upload.array("productImage", 4), productControllers.create);
productRoutes.patch("/update/:id", authentication, authorization("ADMIN"), upload.array("productImage", 4), productControllers.update);
productRoutes.delete("/delete/:id", authentication, authorization("ADMIN"), productControllers.delete);
productRoutes.delete("/image/delete/:id", authentication, authorization("ADMIN"), productControllers.deleteProductImage);
