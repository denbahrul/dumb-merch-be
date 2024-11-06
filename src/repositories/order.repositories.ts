import { OrderDTO } from "@/dto/order.dto";
import { prisma } from "@/libs/prisma";

class OrderRepositories {
  async createOrder(userId: number, orderDto: OrderDTO, transactionToken: string, orderId: string) {
    return await prisma.order.create({
      data: {
        userId,
        totalPrice: orderDto.totalPrice,
        orderId,
        transactionToken,
        orderItems: {
          create: orderDto.orderItem.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            totalPrice: item.totalPrice,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    });
  }

  async getAllOrder() {
    return await prisma.order.findMany({
      include: {
        user: {
          select: {
            profile: true,
          },
        },
        orderItems: {
          include: {
            product: {
              include: {
                category: true,
                productImage: true,
              },
            },
          },
        },
      },
    });
  }
}

export default new OrderRepositories();
