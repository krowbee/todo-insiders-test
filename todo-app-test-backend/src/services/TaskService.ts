import { HttpException } from "../errors/HttpException";
import { prisma } from "../prisma/prisma";
import { Prisma, Task } from "@prisma/client";

export enum TaskStatus {
  TODO = "TODO",
  PROGRESS = "PROGRESS",
  COMPLETE = "COMPLETE",
}

class TaskService {
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
    try {
      const task = await prisma.task.create({ data: taskCreateInput });
      return task;
    } catch (err) {
      throw new HttpException(403, "Invalid data for create task");
    }
  }

  async updateTask(
    taskWhereUniqueInput: Prisma.TaskWhereUniqueInput,
    taskUpdateInput: Prisma.TaskUpdateInput
  ): Promise<Task> {
    try {
      const task = await prisma.task.update({
        where: taskWhereUniqueInput,
        data: taskUpdateInput,
      });
      return task;
    } catch (err) {
      throw new HttpException(403, "Invalid data for updating task");
    }
  }

  async deleteTask(
    taskWhereUniqueInput: Prisma.TaskWhereUniqueInput
  ): Promise<Task> {
    try {
      const task = await prisma.task.delete({ where: taskWhereUniqueInput });
      return task;
    } catch (err) {
      throw new HttpException(403, "Invalid request");
    }
  }

  async validateAccess(taskId: number, userId: number): Promise<Task> {
    const task = await this.findTaskById({ id: taskId });

    if (task.ownerId !== userId)
      throw new HttpException(403, "You don't have access to this resource");

    return task;
  }
}

export const taskService = new TaskService();
