import { RegisterDTO } from "@/dto/auth.dto";
import userRepositories from "@/repositories/user.repositories";
import bcrypt from "bcrypt";

class AuthServices {
  async register(registerInfo: RegisterDTO) {
    const existedUser = await userRepositories.findUserByEmail(registerInfo.email);

    if (existedUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(registerInfo.password, 10);

    const { password, ...createdUser } = await userRepositories.createUser({
      ...registerInfo,
      password: hashedPassword,
    });

    return createdUser;
  }
}

export default new AuthServices();
