import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

import { getUserByEmail } from "./loginhandler";
import { IShop, IUser } from "../../../core/interface/IUser";
import { ILogin } from "../../../core/interface/ILogin";
import { IValidationErrorResponse } from "../../../core/interface/IErrorResponse";
import { HttpErrorsData } from "../../../core/data/httpError.data";
import { HttpException } from "../../../core/exception/HttpException";

const login = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let response = {
      success: false,
      errors: errors.array(),
    };
    return res.status(400).json(response);
  }

  const { email, password }: ILogin = req.body;

  try {
    const user: IUser | IShop | void = await getUserByEmail(
      email,
      password,
      next
    );

    if (user) {
      const token = jwt.sign(
        {
          data: { role: user.role, id: user.id, email: user.email },
        },
        process.env.secret,
        { expiresIn: 100 }
      );

      res.json({
        success: true,
        token: token,
        role: user.role,
        id: user._id,
        email: user.email,
      });
    }
  } catch (err) {
    const error = HttpErrorsData.INTERNAL_SERVER_ERROR;
    error.message = err.message;
    next(new HttpException(error));
  }
};

export { login };
