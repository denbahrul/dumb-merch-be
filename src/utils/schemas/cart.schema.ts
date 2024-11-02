import Joi from "joi";

export const addItemToCartSchema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().required(),
});
