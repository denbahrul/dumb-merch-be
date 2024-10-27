import { UpdateProfileDTO } from "@/dto/user.dto";
import userRepositories from "@/repositories/user.repositories";

class ProfileServices {
  async getProfile(userId: number) {
    return await userRepositories.findUserAndProfile(userId);
  }
  async updateProfile(dto: UpdateProfileDTO) {
    return await userRepositories.updateProfile(dto);
  }
}

export default new ProfileServices();
