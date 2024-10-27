import { UpdateProfileDTO } from "@/dto/user.dto";
import cloudinaryServices from "@/services/cloudinary.services";
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
      const body: UpdateProfileDTO = req.body;
      const fileUpload = req.file;
      const data = {
        ...body,
        userId,
      };

      if (fileUpload) {
        const image = await cloudinaryServices.upload(fileUpload as Express.Multer.File);
        data.profilePhoto = image.secure_url;
      }

      const profile = await userServices.updateProfile(data);
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
