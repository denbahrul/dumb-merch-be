import { RoleEnum } from "@prisma/client";

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  role: RoleEnum;
}

export type LoginDTO = Pick<RegisterDTO, "email" | "password">;
