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

  async findCartById(cartId: number) {
    return prisma.cart.findUnique({
      where: {
        id: cartId,
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

  async updateCart(cartId: number, totalPrice: number) {
    return prisma.cart.update({
      where: {
        id: cartId,
      },
      data: {
        totalPrice,
      },
    });
  }

  async createCartItem(data: addCartItemDTO, totalPrice: number) {
    const { price, ...value } = data;
    return prisma.cartItem.create({
      data: {
        ...value,
        totalPrice,
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

  async updateCartItem(cartItemId: number, quantity: number, totalPrice: number) {
    return prisma.cartItem.update({
      where: {
        id: cartItemId,
      },
      data: {
        quantity,
        totalPrice,
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

  async findCartItemById(cartItemId: number) {
    return prisma.cartItem.findUnique({
      where: {
        id: cartItemId,
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
