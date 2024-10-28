import { CategoryDTO } from "@/dto/category.dto";
import Joi from "joi";

export const CategorySchema = Joi.object<CategoryDTO>({
  categoryName: Joi.string().required(),
});
