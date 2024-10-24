import { RegisterDTO } from "@/dto/auth.dto";
import authServices from "@/services/auth.services";
import { Request, Response } from "express";

class AuthControllers {
  async register(req: Request, res: Response) {
    try {
      const registerBody = req.body as RegisterDTO;
      console.log(registerBody);

      const user = await authServices.register(registerBody);
      res.json({
        user,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new AuthControllers();
