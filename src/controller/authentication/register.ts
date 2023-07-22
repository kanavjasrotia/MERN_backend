import { validationResult } from "express-validator";
import { IValidationErrorResponse } from "../../core/interface/IErrorResponse";
import { NextFunction, Request, Response } from "express";

import { IUser, IShop } from "../../core/interface/IUser";
import { saveUserToDatabase } from "./registerHandler";
import { HttpErrorsData } from "../../core/data/httpError.data";
import { HttpException } from "../../core/exception/HttpException";

const register = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let response: IValidationErrorResponse = {
      success: false,
      errors: errors.array(),
    };
    return res.status(400).json(response);
  }
  try {
    const data: IShop | IUser = req.body;
    const savedUser: IUser | IShop | void = await saveUserToDatabase(
      data,
      next
    );

    res.json({ success: true, data: savedUser });
  } catch (err) {
    const error = HttpErrorsData.INTERNAL_SERVER_ERROR;
    error.message = err.message;
    next(new HttpException(error));
  }
};

export { register };
