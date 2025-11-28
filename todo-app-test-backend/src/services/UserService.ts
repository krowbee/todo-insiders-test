import { User } from "@prisma/client";
import { prisma } from "../prisma/prisma";
import * as bcrypt from "bcrypt";
import { HttpException } from "../errors/HttpException";
const saltOrRounds = 12;

class UserService {
  async registerUser(email: string, password: string) {
    const isUser = await this.findUserByEmail(email);
    if (isUser) throw new HttpException(409, "User already exist");
    const passwordHash = await bcrypt.hash(password, saltOrRounds);
    return prisma.user.create({ data: { email, password: passwordHash } });
  }

  async loginUser(email: string, password: string): Promise<User> {
    const isUser = await this.findUserByEmail(email);
    if (!isUser) throw new HttpException(401, "Invalid email or password");
    const isCorrectPassword = await bcrypt.compare(password, isUser.password);
    if (!isCorrectPassword)
      throw new HttpException(401, "Invalid email or password");
    return isUser;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }
}

export const userService = new UserService();
