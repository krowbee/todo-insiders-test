import { Response, Request } from "express";
import * as dotenv from "dotenv";
dotenv.config();
import { authRouter } from "./routes/AuthRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import { taskRouter } from "./routes/TaskRoutes";

const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World@@");
});

app.use("/auth", authRouter);
app.use("/task", taskRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server works on port ${port} `);
});
