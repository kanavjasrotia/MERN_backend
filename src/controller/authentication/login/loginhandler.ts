import { NextFunction } from "express";
import bcrypt from "bcrypt";

import { HttpErrorsData } from "../../../core/data/httpError.data";
import { HttpException } from "../../../core/exception/HttpException";
import { IUser, IShop } from "../../../core/interface/IUser";
import User from "../../../model/user";

const getUserByEmail = async (
  email: string,
  password: string,
  next: NextFunction
): Promise<void | IUser | IShop> => {
  const user: IUser | IShop = await User.findOne({ email });
  if (!user) {
    const error = HttpErrorsData.NOT_FOUND;
    error.message = "user not found";
    error.description =
      "user with requested email does not exist.Please sign up first";
    return next(new HttpException(error));
  }

  const isPasswordValid: boolean = await bcrypt.compare(
    password,
    user.password
  );
  console.log(isPasswordValid);

  if (!isPasswordValid) {
    const error = HttpErrorsData.VALIDATION_FAILED;

    error.description = "passwords do not match";
    return next(new HttpException(error));
  }

  return user;
};

export { getUserByEmail };
