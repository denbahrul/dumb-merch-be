import { GenderEnum } from "@prisma/client";

export interface UpdateProfileDTO extends Record<string, any> {
  userId: number;
  name?: string;
  profilePhoto?: string | { [key: string]: Express.Multer.File[] };
  phone?: string;
  gender?: GenderEnum;
  address?: string;
}
