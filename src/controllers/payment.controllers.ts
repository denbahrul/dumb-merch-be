import midtrans from "@/libs/midtrans";
import { Request, Response } from "express";

export async function PaymentController(req: Request, res: Response) {
  try {
    const body = {
      product: [
        {
          id: "ITEM1",
          price: 10000,
          quantity: 1,
          name: "Midtrans Bear",
          brand: "Midtrans",
          category: "Toys",
          merchant_name: "Midtrans",
        },
      ],
    };
    const parameter = {
      transaction_details: {
        order_id: "test-transaction-12",
        gross_amount: 10000,
      },
      item_details: body.product,
    };

    const result = await midtrans.createTransaction(parameter);
    res.json({
      result,
    });
  } catch (error) {
    console.log(error);

    const err = error as Error;
    res.status(500).json({
      message: err.message,
    });
  }
}
