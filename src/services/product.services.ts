import { CreateProductDTO, UpdateProductDTO } from "@/dto/product.dto";
import productRepositories from "@/repositories/product.repositories";

class ProductServices {
  async findAll() {
    return await productRepositories.findAll();
  }

  async findById(productId: number) {
    return await productRepositories.findById(productId);
  }

  async create(body: CreateProductDTO) {
    const product = await productRepositories.create(body);
    if (body.productImage) {
      await productRepositories.createImage(body.productImage, product.id);
    }

    return product;
  }

  async update(productId: number, body: UpdateProductDTO) {
    const product = await productRepositories.update(productId, body);
    if (body.productImage) {
      await productRepositories.createImage(body.productImage, product.id);
    }

    return product;
  }

  async delete(productId: number) {
    return await productRepositories.delete(productId);
  }
  async deleteProductImage(productId: number) {
    return await productRepositories.deleteProductImage(productId);
  }
}

export default new ProductServices();
