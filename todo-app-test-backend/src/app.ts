import { Response, Request } from "express";
import * as dotenv from "dotenv";

dotenv.config();

const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World@@");
});

app.listen(port, () => {
  console.log(`Server works on port ${port} `);
});
