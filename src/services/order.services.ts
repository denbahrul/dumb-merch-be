import { OrderDTO } from "@/dto/order.dto";
import midtrans from "@/libs/midtrans";
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
    };

    const transaction = await midtrans.createTransaction(parameter);
    await orderRepositories.createOrder(userId, orderDto, transaction.token, orderId);
    return transaction;
  }
}

export default new OrderServices();
