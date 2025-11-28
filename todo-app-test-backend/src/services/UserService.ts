import { Prisma } from "@prisma/client";
import { prisma } from "../prisma/prisma";

export class UserService {
  async createUser(userCreateInput: Prisma.UserCreateInput) {
    return prisma.user.create({ data: userCreateInput });
  }

  async findUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    return prisma.user.findUnique({ where: userWhereUniqueInput });
  }
}
