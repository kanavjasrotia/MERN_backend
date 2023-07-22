import { check } from "express-validator";

export const validateToken = [
  check("token").notEmpty().withMessage("token is required"),
];
