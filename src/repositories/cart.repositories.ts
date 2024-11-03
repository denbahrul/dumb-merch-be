import { addCartItemDTO } from "@/dto/cart.dto";
import { prisma } from "@/libs/prisma";

class CartRepositories {
  async findCartByUser(userId: number) {
    return prisma.cart.findUnique({
      where: {
        userId,
      },
      include: {
        _count: {
          select: {
            cartItem: true,
          },
        },
        cartItem: {
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
      include: {
        product: {
          include: {
            productImage: true,
            category: true,
          },
        },
      },
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
      include: {
        product: {
          include: {
            productImage: true,
            category: true,
          },
        },
      },
    });
  }

  async deleteCartItem(cartItemId: number) {
    return prisma.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });
  }
}

export default new CartRepositories();
