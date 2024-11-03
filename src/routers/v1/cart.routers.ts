import cartControllers from "@/controllers/cart.controllers";
import { authentication } from "@/middlewares/authentication";
import { Router } from "express";

export const CartRoutes = Router();

CartRoutes.get("/", cartControllers.getCartByUser);
CartRoutes.post("/add", cartControllers.addCartItem);
CartRoutes.delete("/delete/:id", cartControllers.deleteCartItem);
