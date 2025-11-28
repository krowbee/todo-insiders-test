import { taskController } from "../controllers/TaskController";
import { isAuth } from "../middlewares/isAuth";

const express = require("express");

export const taskRouter = express.Router();
taskRouter.get("/", isAuth, taskController.getUserTasks);
taskRouter.get("/status/:status", isAuth, taskController.getUserTasksByStatus);
taskRouter.get("/:taskId", isAuth, taskController.getTask);
taskRouter.patch("/:taskId", isAuth, taskController.updateUserTask);
taskRouter.post("/", isAuth, taskController.createTask);
taskRouter.delete("/:taskId", isAuth, taskController.deleteUserTask);
