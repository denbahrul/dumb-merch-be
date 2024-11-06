import { Router } from "express";
import authRouter from "./v1/auth.routers";
import { userRouter } from "./v1/user.router";
import { categoryRoutes } from "./v1/category.routers";
import { productRoutes } from "./v1/product.routers";
import { CartRoutes } from "./v1/cart.routers";
import { authentication } from "@/middlewares/authentication";
import orderControllers from "@/controllers/order.controllers";
import { orderRoutes } from "./v1/order.routers";
import { prisma } from "@/libs/prisma";
import statisticControllers from "@/controllers/statistic.controllers";

export const routerV1 = Router();

routerV1.use("/auth", authRouter);
routerV1.use("/profile", userRouter);
routerV1.use("/category", categoryRoutes);
routerV1.use("/product", productRoutes);
routerV1.use("/cart", authentication, CartRoutes);

routerV1.use("/order", authentication, orderRoutes);
routerV1.get("/dashboard/admin", statisticControllers.static);

// routerV1.get("/dashboard/admin", async (req, res) => {
//   try {
//     // Total Profit
//     const totalProfit = await prisma.order.aggregate({
//       _sum: { totalPrice: true },
//     });

//     // Total Produk Terjual
//     const totalProductsSold = await prisma.orderItem.aggregate({
//       _sum: { quantity: true },
//     });

//     // Total Pembeli
//     const totalBuyers = await prisma.user.count({
//       where: { order: { some: {} } },
//     });

//     // Top Product
//     const topProduct = await prisma.orderItem.groupBy({
//       by: ["productId"],
//       _sum: { quantity: true },
//       orderBy: { _sum: { quantity: "desc" } },
//       take: 1,
//     });
//     const topProductDetail = await prisma.product.findUnique({
//       where: { id: topProduct[0].productId },
//     });

//     res.json({
//       totalProfit: totalProfit._sum.totalPrice,
//       totalProductsSold: totalProductsSold._sum.quantity,
//       totalBuyers: totalBuyers,
//       topProduct: topProductDetail?.productName,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch dashboard summary data" });
//   }
// });
