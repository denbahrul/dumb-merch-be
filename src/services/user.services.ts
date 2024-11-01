import { UpdateProfileDTO } from "@/dto/user.dto";
import userRepositories from "@/repositories/user.repositories";

class ProfileServices {
  async getProfile(userId: number) {
    return await userRepositories.findUserAndProfile(userId);
  }
  async updateProfile(dto: UpdateProfileDTO) {
    const update = await userRepositories.updateProfile(dto);
    const newProfile = await userRepositories.findUserAndProfile(dto.userId);
    return newProfile;
  }
}

export default new ProfileServices();
