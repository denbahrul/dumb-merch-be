import { addCartItemDTO } from "@/dto/cart.dto";
import cartRepositories from "@/repositories/cart.repositories";

class CartService {
  async addItemToCart(userId: number, itemBody: addCartItemDTO) {
    const cart = await cartRepositories.findCartByUser(userId);
    let cartId = cart?.id;
    if (!cart) {
      const cart = await cartRepositories.createCart(userId);
      cartId = cart.id;
    }
    const data = itemBody;
    data.cartId = cartId!;
    const existingCartItem = await cartRepositories.findCartItemByProductAnCart(data.productId, data.cartId);

    let newCartItem;
    if (!existingCartItem) {
      newCartItem = await cartRepositories.createCartItem(data);
    } else {
      newCartItem = await cartRepositories.updateCartItem(existingCartItem.id, existingCartItem.quantity + itemBody.quantity);
    }
    return newCartItem;
  }

  async getCartByUser(userId: number) {
    return await cartRepositories.findCartByUser(userId);
  }

  async deleteCartItem(cartItemId: number) {
    return await cartRepositories.deleteCartItem(cartItemId);
  }
}

export default new CartService();
