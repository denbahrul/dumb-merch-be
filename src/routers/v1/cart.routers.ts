import cartControllers from "@/controllers/cart.controllers";
import { authentication } from "@/middlewares/authentication";
import { Router } from "express";

export const CartRoutes = Router();

CartRoutes.post("/add", authentication, cartControllers.addCartItem);
