import categoryServices from "@/services/category.services";
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

  async create(req: Request, res: Response) {
    try {
      const userId = res.locals.user.id;
      const { categoryName } = req.body;

      const data = await categoryServices.create(userId, categoryName);
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
      const { categoryName } = req.body;
      const data = await categoryServices.update(categoryId, categoryName);
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
      await categoryServices.delete(categoryId);

      res.json({
        message: "Category deleted",
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
