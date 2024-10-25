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
      console.log(error);

      const err = error as Error;
      res.status(500).json({
        message: err.message,
      });
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
      console.log(error);

      const err = error as Error;
      res.status(400).json({
        message: err.message,
      });
    }
  }

  async getUserLogged(req: Request, res: Response) {
    try {
      const user = res.locals.user;
      res.json({
        user,
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

export default new AuthControllers();
