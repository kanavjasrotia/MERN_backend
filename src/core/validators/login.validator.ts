import { body } from "express-validator";

import User from "../../model/user";
import { HttpException } from "../exception/HttpException";
import { HttpErrorsData } from "../data/httpError.data";
// Define custom error classes
class UserNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "UserNotFoundError";
  }
}

export const validateLogin = [
  body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Invalid email format."),
  // .custom(async (value, { req }) => {
  //   try {
  //     const existingUser = await User.findOne({ email: value });
  //     if (!existingUser) {
  //       // If user is not found, throw a custom UserNotFoundError
  //       throw new UserNotFoundError(
  //         "User with the given email does not exist"
  //       );
  //     }
  //     req.body.existingUser = existingUser;
  //   } catch (error) {
  //     // Check the type of the error
  //     if (error instanceof UserNotFoundError) {
  //       // Re-throw the error to preserve the original throw from try block
  //       throw error;
  //     } else {
  //       const error = HttpErrorsData.INTERNAL_SERVER_ERROR;
  //       // Handle other types of errors as needed
  //       throw new HttpException(error);
  //     }
  //   }
  // }),

  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
];
