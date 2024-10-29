import { RegisterDTO } from "@/dto/auth.dto";
import { UpdateProfileDTO } from "@/dto/user.dto";
import { prisma } from "@/libs/prisma";

class UserRepositories {
  async createUser(registerDto: RegisterDTO) {
    return await prisma.user.create({
      data: {
        email: registerDto.email,
        password: registerDto.password,
        username: registerDto.username,
        role: registerDto.role,
        profile: {
          create: {
            fullName: registerDto.fullName,
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
  async findUserById(id: number) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        role: true,
        username: true,
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
        // fullName: body.fullName,
        // phone: body.phone,
        // gender: body.gender,
        // address: body.address,
        // profilePhoto: body.profilePhoto,
      },
    });
  }

  async getUserByUsername(username: string) {
    return prisma.user.findUnique({
      where: {
        username,
      },
    });
  }
}
export default new UserRepositories();
