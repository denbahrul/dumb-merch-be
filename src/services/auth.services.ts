import { LoginDTO, RegisterDTO } from "@/dto/auth.dto";
import userRepositories from "@/repositories/user.repositories";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthServices {
  async register(registerInfo: RegisterDTO) {
    const existedUser = await userRepositories.findUserByEmail(registerInfo.email);

    if (existedUser) {
      throw {
        status: "fail",
        message: "Email already use",
      };
    }

    const hashedPassword = await bcrypt.hash(registerInfo.password, 10);

    const { password, ...createdUser } = await userRepositories.createUser({
      ...registerInfo,
      password: hashedPassword,
    });

    return createdUser;
  }

  async login(loginInfo: LoginDTO) {
    const user = await userRepositories.findUserByEmail(loginInfo.email);

    if (!user) {
      throw {
        status: "fail",
        message: "Incorrect Email / Password",
      };
    }

    const isPasswordValid = await bcrypt.compare(loginInfo.password, user.password);

    if (!isPasswordValid) {
      throw {
        status: "fail",
        message: "Incorrect Email / Password",
      };
    }

    const { password, ...userToSign } = user;
    const screetKey = process.env.JWT_SCREET_KEY as string;
    const accessToken = jwt.sign(userToSign, screetKey);

    return {
      user: userToSign,
      accessToken,
    };
  }

  // async getUserLogged(email: string) {
  //   const user = await userRepositories.findUserByEmail(email);

  //   if (!user) {
  //     throw {
  //       status: "fail",
  //       message: "Invalid user token",
  //     };
  //   }

  //   const { password, ...data } = user;
  //   return data;
  // }
}

export default new AuthServices();
