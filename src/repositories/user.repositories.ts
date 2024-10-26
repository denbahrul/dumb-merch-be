import { RegisterDTO } from "@/dto/auth.dto";
import { UpdateProfileDTO } from "@/dto/user.dto";
import { prisma } from "@/libs/prisma";

class UserRepositories {
  async createUser(registerDto: RegisterDTO) {
    return await prisma.user.create({
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
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findUserAndProfile(id: number) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        profile: true,
      },
    });
  }

  async updateProfile(userId: number, body: UpdateProfileDTO) {
    return await prisma.profile.update({
      where: {
        userId,
      },
      data: {
        ...body,
        // name: body.name,
        // phone: body.phone,
        // gender: body.gender,
        // address: body.address,
        // profilePhoto: body.profilePhoto,
      },
    });
  }
}
export default new UserRepositories();
