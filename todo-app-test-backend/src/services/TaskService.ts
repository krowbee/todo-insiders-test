import { prisma } from "../prisma/prisma";
import { Prisma, Task } from "@prisma/client";

export class TaskService {
  async findTask(
    taskWhereUniqueInput: Prisma.TaskWhereUniqueInput
  ): Promise<Task | null> {
    return prisma.task.findUnique({ where: taskWhereUniqueInput });
  }

  async findTasks(taskWhereInput?: Prisma.TaskWhereInput): Promise<Task[]> {
    return prisma.task.findMany({ where: taskWhereInput });
  }

  async createTask(taskCreateInput: Prisma.TaskCreateInput): Promise<Task> {
    return prisma.task.create({ data: taskCreateInput });
  }

  async updateTask(
    taskWhereUniqueInput: Prisma.TaskWhereUniqueInput,
    taskUpdateInput: Prisma.TaskUpdateInput
  ): Promise<Task> {
    return prisma.task.update({
      where: taskWhereUniqueInput,
      data: taskUpdateInput,
    });
  }

  async deleteTask(
    taskWhereUniqueInput: Prisma.TaskWhereUniqueInput
  ): Promise<Task> {
    return prisma.task.delete({ where: taskWhereUniqueInput });
  }
}
