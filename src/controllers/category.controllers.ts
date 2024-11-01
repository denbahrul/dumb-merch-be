import { CategoryDTO } from "@/dto/category.dto";
import categoryServices from "@/services/category.services";
import { CategorySchema } from "@/utils/schemas/category.schema";
import { Request, Response } from "express";

class CategoryControllers {
  async findAll(req: Request, res: Response) {
    try {
      const data = await categoryServices.findAll();
      res.json({
        data,
      });
    } catch (error) {
      console.log(error);

      const err = error as Error;
      res.status(500).json({
        message: err.message,
      });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const categoryId = +req.params.id;
      const data = await categoryServices.findById(categoryId);
      res.json({
        data,
      });
    } catch (error) {
      console.log(error);

      const err = error as Error;
      res.status(500).json({
        message: err.message,
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const userId = res.locals.user.id;
      const categoryBody = req.body as CategoryDTO;
      const value = await CategorySchema.validateAsync(categoryBody);

      const data = await categoryServices.create(userId, value.categoryName);
      res.json({
        message: "Category created",
        data,
      });
    } catch (error) {
      console.log(error);

      const err = error as Error;
      res.status(500).json({
        message: err.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const categoryId = +req.params.id;
      const categoryBody = req.body as CategoryDTO;
      const value = await CategorySchema.validateAsync(categoryBody);

      const data = await categoryServices.update(categoryId, value.categoryName);
      res.json({
        message: "Category updated",
        data,
      });
    } catch (error) {
      console.log(error);

      const err = error as Error;
      res.status(500).json({
        message: err.message,
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const categoryId = +req.params.id;
      const data = await categoryServices.delete(categoryId);

      res.json({
        message: `Category ${data.categoryName} deleted`,
        data,
      });
    } catch (error) {
      console.log(error);

      const err = error as Error;
      res.status(500).json({
        message: err.message,
      });
    }
  }
}

export default new CategoryControllers();
