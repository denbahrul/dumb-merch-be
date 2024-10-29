import { LoginDTO, RegisterDTO } from "@/dto/auth.dto";
import authServices from "@/services/auth.services";
import userServices from "@/services/user.services";
import { LoginSchema, RegisterSchema } from "@/utils/schemas/auth.schema";
import { Request, Response } from "express";

class AuthControllers {
  async register(req: Request, res: Response) {
    try {
      const registerBody = req.body as RegisterDTO;
      const value = await RegisterSchema.validateAsync(registerBody);

      await authServices.register(value);
      const data = await authServices.login(value);
      res.json({
        message: "User created",
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

  async login(req: Request, res: Response) {
    try {
      const loginBody = await LoginSchema.validateAsync(req.body as LoginDTO);
      const data = await authServices.login(loginBody);
      res.json({
        message: "User logged succesfully",
        data,
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
      const data = await authServices.getUserLogged(user.id);
      res.json({
        ...data,
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
