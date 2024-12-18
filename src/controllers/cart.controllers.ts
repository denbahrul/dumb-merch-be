import { addCartItemDTO } from "@/dto/cart.dto";
import cartServices from "@/services/cart.services";
import { addItemToCartSchema } from "@/utils/schemas/cart.schema";
import { Request, Response } from "express";

export class CartControllers {
  async addCartItem(req: Request, res: Response) {
    try {
      const body: addCartItemDTO = req.body;
      const userId = res.locals.user.id;
      const value = await addItemToCartSchema.validateAsync(body);
      const data = await cartServices.addItemToCart(userId, value);
      res.json({
        message: "Added to cart",
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

  async getCartByUser(req: Request, res: Response) {
    try {
      const userId = res.locals.user.id;
      const data = await cartServices.getCartByUser(userId);
      res.json(data);
    } catch (error) {
      console.log(error);

      const err = error as Error;
      res.status(500).json({
        message: err.message,
      });
    }
  }

  async deleteCartItem(req: Request, res: Response) {
    try {
      const cartItemId = req.params.id;

      const data = await cartServices.deleteCartItem(+cartItemId);
      res.json(data);
    } catch (error) {
      console.log(error);

      const err = error as Error;
      res.status(500).json({
        message: err.message,
      });
    }
  }
}

export default new CartControllers();
