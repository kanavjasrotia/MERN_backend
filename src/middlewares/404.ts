import { Request, Response, NextFunction } from "express";

import { HttpErrorsData } from "../core/data/httpError.data";
import { HttpException } from "../core/exception/HttpException";

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = HttpErrorsData.NOT_FOUND;
  error.description = `Route ${req.originalUrl} not found on this server`;
  next(new HttpException(error));
};
