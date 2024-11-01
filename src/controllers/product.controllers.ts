import { CreateProductDTO, UpdateProductDTO } from "@/dto/product.dto";
import cloudinaryServices from "@/services/cloudinary.services";
import productServices from "@/services/product.services";
import { createProductSchema, updateProductSchema } from "@/utils/schemas/product.schema";
import { Request, Response } from "express";

class ProductControllers {
  async findAll(req: Request, res: Response) {
    try {
      const data = await productServices.findAll();
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
      const productId = +req.params.id;
      const data = await productServices.findById(productId);
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
      const body: CreateProductDTO = req.body;
      body.userId = userId;

      if (req.files) {
        const images = req.files as Express.Multer.File[];
        const imagesUrl = await Promise.all(
          images.map(async (image) => {
            const uploadResult = await cloudinaryServices.upload(image);
            return { url: uploadResult.secure_url };
          })
        );

        body.productImage = imagesUrl;
      }

      const value = await createProductSchema.validateAsync(body);
      const data = await productServices.create(value);
      res.json({
        message: `Product ${data.productName} created`,
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
      const productId = +req.params.id;
      const body: UpdateProductDTO = req.body;
      if (req.files) {
        const images = req.files as Express.Multer.File[];
        const imagesUrl = await Promise.all(
          images.map(async (image) => {
            const uploadResult = await cloudinaryServices.upload(image);
            return { url: uploadResult.secure_url };
          })
        );

        body.productImage = imagesUrl;
      }

      const data = await updateProductSchema.validateAsync(body);
      const product = await productServices.update(productId, data);
      res.json({
        message: "Product updated",
        product,
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
      const productId = +req.params.id;
      const data = await productServices.delete(productId);
      res.json({
        message: `Product ${data.productName} was deleted`,
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

  async deleteProductImage(req: Request, res: Response) {
    try {
      const id = +req.params.id;
      const data = await productServices.deleteProductImage(id);
      res.json({
        message: `Image was deleted`,
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

export default new ProductControllers();
