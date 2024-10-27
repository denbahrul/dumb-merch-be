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

  async updateProfile(body: UpdateProfileDTO) {
    const { userId, ...data } = body;
    return await prisma.profile.update({
      where: {
        userId: body.userId,
      },
      data: {
        ...data,
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
