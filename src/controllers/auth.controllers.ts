import { LoginDTO, RegisterDTO } from "@/dto/auth.dto";
import authServices from "@/services/auth.services";
import { LoginSchema, RegisterSchema } from "@/utils/schemas/auth.schema";
import { Request, Response } from "express";

class AuthControllers {
  async register(req: Request, res: Response) {
    try {
      const registerBody = req.body as RegisterDTO;
      const value = await RegisterSchema.validateAsync(registerBody);
      console.log(registerBody);

      const user = await authServices.register(value);
      res.json({
        user,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const loginBody = await LoginSchema.validateAsync(req.body as LoginDTO);
      const user = await authServices.login(loginBody);
      res.json({
        user,
      });
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

export default new AuthControllers();
