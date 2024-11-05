import { OrderDTO } from "@/dto/order.dto";
import { prisma } from "@/libs/prisma";

class OrderRepositories {
  async createOrder(userId: number, orderDto: OrderDTO, transactionToken: string, orderId: string) {
    await prisma.order.create({
      data: {
        userId,
        totalPrice: orderDto.totalPrice,
        orderId,
        transactionToken,
        orderItems: {
          create: orderDto.orderItem.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    });
  }
}

export default new OrderRepositories();
