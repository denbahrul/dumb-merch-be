import { OrderDTO } from "@/dto/order.dto";
import midtrans from "@/libs/midtrans";
import orderServices from "@/services/order.services";
import { Request, Response } from "express";

export async function OrderController(req: Request, res: Response) {
  try {
    const body: OrderDTO = req.body;
    const userId = res.locals.user.id;
    // const value = {
    //   product: [
    //     {
    //       id: "ITEM1",
    //       price: 25000,
    //       quantity: 1,
    //       name: "Midtrans Bear",
    //       brand: "Midtrans",
    //       category: "Toys",
    //       merchant_name: "Midtrans",
    //     },
    //   ],
    // };
    // const parameter = {
    //   transaction_details: {
    //     order_id: "test-transaction-4",
    //     gross_amount: 25000,
    //   },
    //   item_details: body.product,
    // };
    // const result = await midtrans.createTransaction(parameter);
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
