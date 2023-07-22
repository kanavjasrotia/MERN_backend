import { check } from "express-validator";

import Shop from "../../model/user";

const validateShop = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 50 })
    .withMessage("Name must be between 0 and 50 characters"),

  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (value) => {
      try {
      } catch (error) {
        throw new Error("Error checking email uniqueness");
      }
    }),

  check("ownerName")
    .if((value, { req }) => req.body.role === "shop") // Apply validation only if role is 'shop'
    .notEmpty()
    .withMessage("Owner name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Owner name must be between 2 and 50 characters"),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  check("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirm password does not match");
      }
      return true;
    }),
];

export { validateShop };
