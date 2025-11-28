import { Request, Response, NextFunction } from "express";
import { taskService } from "../services/TaskService";
import { TaskStatus } from "../services/TaskService";
import { HttpException } from "../errors/HttpException";

class TaskController {
  getTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { taskId } = req.params;
      const user = (req as any).user;
      const task = await taskService.validateAccess(parseInt(taskId), user.id);
      return res.status(200).json({ task: task });
    } catch (err) {
      next(err);
    }
  };

  getUserTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as any).user;
      const tasks = await taskService.findUserTasks(user.id);
      return res.status(200).json({ tasks });
    } catch (err) {
      next(err);
    }
  };

  getUserTasksByStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { status } = req.params;
      const user = (req as any).user;
      if (!this.isTaskStatus(status))
        throw new HttpException(400, "Incorrect status");
      const tasks = await taskService.findUserTasks(user.id, status);
      return res.status(200).json({ tasks });
    } catch (err) {
      next(err);
    }
  };

  createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const task = await taskService.createTask(data);
      return res.status(201).json({ task });
    } catch (err) {
      next(err);
    }
  };

  updateUserTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as any).user;
      const { taskId } = req.params;

      const isValidAccess = await taskService.validateAccess(
        parseInt(taskId),
        user.id
      );
      const data = req.body;
      const updatedTask = await taskService.updateTask(
        { id: parseInt(taskId) },
        data
      );
      return res.status(200).json({ task: updatedTask });
    } catch (err) {
      next(err);
    }
  };

  deleteUserTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { taskId } = req.params;
      const user = (req as any).user;
      const isValidAccess = await taskService.validateAccess(
        parseInt(taskId),
        user.id
      );
      const deletedTask = await taskService.deleteTask({
        id: parseInt(taskId),
      });
      res.status(200).json({ task: deletedTask });
    } catch (err) {
      next(err);
    }
  };

  isTaskStatus(value: string): value is TaskStatus {
    return Object.values(TaskStatus).includes(value as TaskStatus);
  }
}

export const taskController = new TaskController();
