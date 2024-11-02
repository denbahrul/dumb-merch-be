import { addCartItemDTO } from "@/dto/cart.dto";
import cartRepositories from "@/repositories/cart.repositories";

class CartService {
  async addItemToCart(userId: number, itemBody: addCartItemDTO) {
    let cart = await cartRepositories.findCartByUser(userId);
    if (!cart) {
      cart = await cartRepositories.createCart(userId);
    }
    const data = itemBody;
    data.cartId = cart!.id;
    const existingCartItem = await cartRepositories.findCartItemByProductAnCart(data.productId, data.cartId);

    let newCartItem;
    if (!existingCartItem) {
      newCartItem = await cartRepositories.createCartItem(data);
    } else {
      newCartItem = await cartRepositories.updateCartItem(existingCartItem.id, existingCartItem.quantity + itemBody.quantity);
    }
    return newCartItem;
  }
}

export default new CartService();
