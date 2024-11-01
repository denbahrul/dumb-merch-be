import categoryRepositories from "@/repositories/category.repositories";

class CategoryServices {
  async findAll() {
    return await categoryRepositories.findAll();
  }

  async findById(categorytId: number) {
    return await categoryRepositories.findById(categorytId);
  }

  async create(userId: number, categoryName: string) {
    return await categoryRepositories.create(userId, categoryName);
  }

  async update(categoryId: number, categoryName: string) {
    return await categoryRepositories.update(categoryId, categoryName);
  }

  async delete(categoryId: number) {
    return await categoryRepositories.delete(categoryId);
  }
}

export default new CategoryServices();
