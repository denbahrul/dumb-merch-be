import { CreateProductDTO } from "@/dto/product.dto";
import Joi from "joi";

export const createProductSchema = Joi.object<CreateProductDTO>({
  productName: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().precision(2),
  quantity: Joi.number().required(),
  categoryId: Joi.number().required(),
  userId: Joi.number().required(),
  productImage: Joi.array(),
});
export const updateProductSchema = Joi.object<CreateProductDTO>({
  productName: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().precision(2),
  quantity: Joi.number().required(),
  categoryId: Joi.number().required(),
  productImage: Joi.array(),
});
