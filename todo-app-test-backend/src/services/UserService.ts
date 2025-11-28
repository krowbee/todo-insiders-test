import { Prisma, User } from "@prisma/client";
import { prisma } from "../prisma/prisma";
import * as bcrypt from "bcrypt";

const saltOrRounds = 12;

export class UserService {
  async registerUser(email: string, password: string) {
    const isUser = await this.findUserByEmail(email);
    if (isUser) throw new Error("User already exist");
    const passwordHash = await bcrypt.hash(password, saltOrRounds);
    return prisma.user.create({ data: { email, password: passwordHash } });
  }

  async loginUser(email: string, password: string): Promise<User> {
    const isUser = await this.findUserByEmail(email);
    if (!isUser) throw new Error("User is not exist");
    const isCorrectPassword = await bcrypt.compare(password, isUser.password);
    if (!isCorrectPassword) throw new Error("Incorrect password");
    return isUser;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }
}
