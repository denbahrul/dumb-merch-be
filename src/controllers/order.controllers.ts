import { OrderDTO } from "@/dto/order.dto";
import midtrans from "@/libs/midtrans";
import orderServices from "@/services/order.services";
import { Request, Response } from "express";

// export async function OrderController(req: Request, res: Response) {
//   try {
//     const body: OrderDTO = req.body;
//     const userId = res.locals.user.id;
//     const data = await orderServices.CreateOrder(userId, body);
//     res.json({
//       data,
//     });
//   } catch (error) {
//     console.log(error);

//     const err = error as Error;
//     res.status(500).json({
//       message: err.message,
//     });
//   }
// }

class OrderControllers {
  async checkout(req: Request, res: Response) {
    try {
      const body: OrderDTO = req.body;
      const userId = res.locals.user.id;
      const data = await orderServices.CreateOrder(userId, body);
      res.json({
        data,
      });
    } catch (error) {
      console.log(error);

      const err = error as Error;
      res.status(500).json({
        message: err.message,
      });
    }
  }

  async getAllOrder(req: Request, res: Response) {
    try {
      const data = await orderServices.getAllOrder();
      res.json({
        data,
      });
    } catch (error) {
      console.log(error);

      const err = error as Error;
      res.status(500).json({
        message: err.message,
      });
    }
  }
}

export default new OrderControllers();
