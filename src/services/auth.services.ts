import { LoginDTO, RegisterDTO } from "@/dto/auth.dto";
import cartRepositories from "@/repositories/cart.repositories";
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
    let generateUsername;
    let existedUsername;

    do {
      const randomMath = Math.floor(Math.random() * 1000);
      const emailSplit = registerInfo.email.split("@")[0];
      generateUsername = `${emailSplit}${randomMath}`;

      existedUsername = await userRepositories.getUserByUsername(generateUsername);
    } while (existedUsername);

    const { password, ...createdUser } = await userRepositories.createUser({
      ...registerInfo,
      username: generateUsername,
      password: hashedPassword,
    });

    if (createdUser.role === "CUSTOMER") {
      await cartRepositories.createCart(createdUser.id);
    }

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

  async getUserLogged(id: number) {
    const user = await userRepositories.findUserById(id);

    if (!user) {
      throw {
        status: "fail",
        message: "Invalid user token",
      };
    }

    return user;
  }
}

export default new AuthServices();
