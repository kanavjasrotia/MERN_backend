import bcrypt from "bcrypt";
import { ObjectId } from "mongoose";

import EUserRole from "../../core/enum/ERole";
import { IShop, IUser } from "../../core/interface/IUser";
import User from "../../model/user";
import { HttpErrorsData } from "../../core/data/httpError.data";
import { HttpException } from "../../core/exception/HttpException";
import { NextFunction } from "express";

export const saveUserToDatabase = async (
  userData: IShop | IUser,
  next: NextFunction
): Promise<IUser | IShop | void> => {
  const user: IUser | IShop = await User.findOne({ email: userData.email });
  if (user) {
    const error = HttpErrorsData.ALREADY_EXISTS;
    error.message = "user with the given email already esists";
    error.description =
      "user with requested email already exists.Please sign up with new one or login with the email";
    return next(new HttpException(error));
  }

  console.log(userData);
  userData.role = !userData.role ? EUserRole.User : userData.role;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

  const newUser = new User({
    ...userData,
    password: hashedPassword,
    // _id: Object("64b63bd432f94a8680b96c5b"),
  });

  return newUser.save();
};
