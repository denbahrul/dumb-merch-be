import { addCartItemDTO } from "@/dto/cart.dto";
import { prisma } from "@/libs/prisma";

class CartRepositories {
  async findCartByUser(userId: number) {
    return prisma.cart.findUnique({
      where: {
        userId,
      },
    });
  }

  async findCartItemByProductAnCart(productId: number, cartId: number) {
    return prisma.cartItem.findFirst({
      where: {
        productId,
        cartId,
      },
    });
  }

  async createCart(userId: number) {
    return prisma.cart.create({
      data: {
        userId,
      },
    });
  }

  async createCartItem(data: addCartItemDTO) {
    return prisma.cartItem.create({
      data,
    });
  }

  async updateCartItem(cartItemId: number, quantity: number) {
    return prisma.cartItem.update({
      where: {
        id: cartItemId,
      },
      data: {
        quantity,
      },
    });
  }
}

export default new CartRepositories();
