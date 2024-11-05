import { Router } from "express";
import authRouter from "./v1/auth.routers";
import { userRouter } from "./v1/user.router";
import { categoryRoutes } from "./v1/category.routers";
import { productRoutes } from "./v1/product.routers";
import { CartRoutes } from "./v1/cart.routers";
import { authentication } from "@/middlewares/authentication";
import { OrderController } from "@/controllers/order.controllers";

export const routerV1 = Router();

routerV1.use("/auth", authRouter);
routerV1.use("/profile", userRouter);
routerV1.use("/category", categoryRoutes);
routerV1.use("/product", productRoutes);
routerV1.use("/cart", authentication, CartRoutes);

routerV1.post("/order", authentication, OrderController);
