import { prisma } from "@/libs/prisma";

class CategoryRepositories {
  async findAll() {
    return prisma.category.findMany();
  }
  async create(userId: number, categoryName: string) {
    return prisma.category.create({
      data: {
        categoryName,
        userId,
      },
    });
  }

  async update(categoryId: number, categoryName: string) {
    return prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        categoryName,
      },
    });
  }

  async delete(categoryId: number) {
    return prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
  }
}

export default new CategoryRepositories();
