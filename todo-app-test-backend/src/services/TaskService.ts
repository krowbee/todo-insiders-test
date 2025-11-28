import { HttpException } from "../errors/HttpException";
import { prisma } from "../prisma/prisma";
import { Prisma, Task } from "@prisma/client";

enum TaskStatus {
  TODO = "TODO",
  PROGRESS = "PROGRESS",
  COMPLETE = "COMPLETE",
}

export class TaskService {
  async findTaskById(
    taskWhereUniqueInput: Prisma.TaskWhereUniqueInput
  ): Promise<Task> {
    const task = await prisma.task.findUnique({ where: taskWhereUniqueInput });
    if (!task) throw new HttpException(404, "Incorrect task id");
    return task;
  }

  async findUserTasks(userId: number, status?: TaskStatus): Promise<Task[]> {
    return prisma.task.findMany({ where: { ownerId: userId, status } });
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

  async validateAccess(taskId: number, userId: number): Promise<boolean> {
    const task = await this.findTaskById({ id: taskId });

    if (task.ownerId !== userId)
      throw new HttpException(403, "You don't have access to this resource");

    return true;
  }
}
