import { UpdateProfileDTO } from "@/dto/user.dto";
import userRepositories from "@/repositories/user.repositories";

class ProfileServices {
  async getProfile(userId: number) {
    return await userRepositories.findUserAndProfile(userId);
  }
  async updateProfile(userId: number, dto: UpdateProfileDTO) {
    return await userRepositories.updateProfile(userId, dto);
  }
}

export default new ProfileServices();
