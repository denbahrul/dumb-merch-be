import Joi from "joi";
import { RegisterDTO } from "@/dto/auth.dto";
import { RoleEnum } from "@prisma/client";

export const RegisterSchema = Joi.object<RegisterDTO>({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6),
  role: Joi.string().valid(RoleEnum.ADMIN, RoleEnum.CUSTOMER),
});

export const LoginSchema = Joi.object<RegisterDTO>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6),
});
