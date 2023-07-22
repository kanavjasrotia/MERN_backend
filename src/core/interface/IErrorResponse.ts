import { ValidationError } from "express-validator";

export interface IErrorBody {
  status: number;
  msg: string;
  code?: string;
  description?: string;
}

export interface IValidationErrorResponse {
  success: boolean;
  errors: Array<ValidationError | IErrorBody>;
}
