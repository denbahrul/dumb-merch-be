import { RegisterDTO } from "@/dto/auth.dto";
import { prisma } from "@/libs/prisma";

class UserRepositories {
  async createUser(registerDto: RegisterDTO) {
    return prisma.user.create({
      data: {
        email: registerDto.email,
        password: registerDto.password,
        profile: {
          create: {
            name: registerDto.name,
          },
        },
      },
    });
  }

  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}

export default new UserRepositories();
