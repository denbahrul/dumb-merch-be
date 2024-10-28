import { CreateProductDTO, ProductImage, UpdateProductDTO } from "@/dto/product.dto";
import { prisma } from "@/libs/prisma";

class ProductRepositories {
  async findAll() {
    return await prisma.product.findMany({
      include: {
        productImage: true,
      },
    });
  }

  async findById(productId: number) {
    return await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        productImage: true,
      },
    });
  }

  async create(createProductDto: CreateProductDTO) {
    const { productImage, ...data } = createProductDto;
    return await prisma.product.create({
      data,
    });
  }

  async createImage(images: ProductImage[], productId: number) {
    return prisma.productImage.createMany({
      data: images.map((image) => ({
        url: image.url,
        productId: productId,
      })),
    });
  }

  async update(productId: number, updateCategoryDto: UpdateProductDTO) {
    const { ...data } = updateCategoryDto;
    return await prisma.product.update({
      where: {
        id: productId,
      },
      data,
    });
  }

  async delete(productId: number) {
    return await prisma.product.delete({
      where: {
        id: productId,
      },
    });
  }
}

export default new ProductRepositories();
