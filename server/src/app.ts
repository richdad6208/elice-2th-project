import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import pingRouter from "./routers/pingRouter";
import { errorMiddleware } from "./middlewares/errorMiddlewares";

dotenv.config();

const app = express();
const port: string = process.env.PORT;
const mongoURI: string = process.env.MONGO_DB_PATH;

mongoose
  .connect(mongoURI as string)
  .then(() => console.log("mongoose connected"))
  .catch((err: Error) => console.log("DB connection fail", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/ping", pingRouter);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
