import { RegisterDTO } from "@/dto/auth.dto";
import { prisma } from "@/libs/prisma";

class UserRepositories {
  async createUser(registerDto: RegisterDTO) {
    return prisma.user.create({
      data: {
        email: registerDto.email,
        password: registerDto.password,
        role: registerDto.role,
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

  async findUserAndProfile(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        profile: true,
      },
    });
  }
}

export default new UserRepositories();
