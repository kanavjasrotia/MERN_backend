import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import mongoose from "mongoose";

import aunthenticationRoutes from "./route/authentication.route";
import { notFoundHandler } from "./middlewares/404";
import { HttpException } from "./core/exception/HttpException";

const app = express();
const port = 3001;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
  // message:new HttpException()
});

app.use(express.json());
app.use(cors(corsOptions));
app.use(limiter);

app.use(aunthenticationRoutes);
app.use(notFoundHandler);

app.use(
  (err: Error, req: Request, res: Response, next: NextFunction): Response => {
    const customErr = err as HttpException;
    return res.status(customErr.status).json({
      success: false,

      status: customErr.status,
      msg: customErr.message,
      code: customErr.code,
      description: customErr?.description,
    });
  }
);

mongoose
  .connect("mongodb://127.0.0.1:27017/newdb?compressors=none")
  .then((result) => {
    console.log("connected");
    return result;
  })
  .then((result) => {
    app.listen(port, () => {
      console.log("server running");
    });
  })
  .catch((err) => {
    console.log("GOT ERROR", err);
  });
