import { OrderDTO } from "@/dto/order.dto";
import midtrans from "@/libs/midtrans";
import cartRepositories from "@/repositories/cart.repositories";
import orderRepositories from "@/repositories/order.repositories";
import { v4 as uuidv4 } from "uuid";

class OrderServices {
  async CreateOrder(userId: number, orderDto: OrderDTO) {
    const orderId = uuidv4();

    const body = {
      product: orderDto.orderItem.map((item) => ({
        id: item.productId,
        price: item.product.price,
        quantity: item.quantity,
        name: item.product.productName,
        category: item.product.category.categoryName,
        merchant_name: "Dumb Merch",
      })),
    };

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: orderDto.totalPrice,
      },
      item_details: body.product,
      callbacks: {
        finish: "http://localhost:5173/profile",
      },
    };

    const transaction = await midtrans.createTransaction(parameter);
    await orderRepositories.createOrder(userId, orderDto, transaction.token, orderId);
    console.log("11>>>>>", orderDto.cartId);
    await cartRepositories.deleteAllCartItem(orderDto.cartId);
    console.log("22>>>>>", orderDto.cartId);

    await cartRepositories.updateCart(orderDto.cartId, 0);
    return transaction;
  }

  async getAllOrder() {
    return await orderRepositories.getAllOrder();
  }
}

export default new OrderServices();
