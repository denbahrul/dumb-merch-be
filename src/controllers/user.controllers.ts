import { UpdateProfileDTO } from "@/dto/user.dto";
import userServices from "@/services/user.services";
import profileServices from "@/services/user.services";
import { Request, Response } from "express";

class ProfileControllers {
  async getProfile(req: Request, res: Response) {
    try {
      const userId = res.locals.user.id;

      const profile = await profileServices.getProfile(userId);
      res.json({
        profile,
      });
    } catch (error) {
      console.log(error);
      const err = error as Error;
      res.status(500).json({
        message: err.message,
      });
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const userId = res.locals.user.id;
      const profilePhoto = req.file;
      console.log(profilePhoto);

      const body: UpdateProfileDTO = req.body;
      const profile = await userServices.updateProfile(userId, body);
      res.json({
        profile,
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

export default new ProfileControllers();
