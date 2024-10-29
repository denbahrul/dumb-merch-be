import { RoleEnum } from "@prisma/client";

export interface RegisterDTO {
  fullName: string;
  email: string;
  username: string;
  password: string;
  role: RoleEnum;
}

export type LoginDTO = Pick<RegisterDTO, "email" | "password">;
