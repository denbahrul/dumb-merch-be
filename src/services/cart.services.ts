import { addCartItemDTO } from "@/dto/cart.dto";
import cartRepositories from "@/repositories/cart.repositories";

class CartService {
  async addItemToCart(userId: number, itemBody: addCartItemDTO) {
    let cart = await cartRepositories.findCartByUser(userId);
    if (!cart) {
      cart = await cartRepositories.createCart(userId);
    }
    const data = itemBody;
    data.cartId = cart.id;
    const existingCartItem = await cartRepositories.findCartItemByProductAnCart(data.productId, data.cartId);
    const totalPrice = itemBody.quantity * itemBody.price;

    let newCartItem;
    if (!existingCartItem) {
      newCartItem = await cartRepositories.createCartItem(data, totalPrice);
      await cartRepositories.updateCart(cart.id, cart.totalPrice + totalPrice);
    } else {
      newCartItem = await cartRepositories.updateCartItem(existingCartItem.id, existingCartItem.quantity + itemBody.quantity, existingCartItem.totalPrice + totalPrice);
      await cartRepositories.updateCart(cart.id, cart.totalPrice + totalPrice);
    }
    return newCartItem;
  }

  async getCartByUser(userId: number) {
    return await cartRepositories.findCartByUser(userId);
  }

  async deleteCartItem(cartItemId: number) {
    const cartItem = await cartRepositories.findCartItemById(cartItemId);
    console.log("xxxxxx", cartItem);

    const cart = await cartRepositories.findCartById(cartItem?.cartId!);
    await cartRepositories.updateCart(cartItem?.cartId!, cart?.totalPrice! - cartItem?.totalPrice!);
    const cartDelete = await cartRepositories.deleteCartItem(cartItemId);

    return cartDelete;
  }
}

export default new CartService();
