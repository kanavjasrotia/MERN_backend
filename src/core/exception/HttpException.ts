import { IHttpErrorItem } from "../interface/IHttpError";

export class HttpException extends Error {
  readonly name = "HttpException";
  readonly status: number;
  readonly code?: string;
  readonly description?: string;

  constructor(error: IHttpErrorItem) {
    super(error.message);
    this.status = error.status;
    this.code = error.code;
    this.description = error?.description;
    Error.captureStackTrace(this, this.constructor); // capture stack trace and set it to this
  }
}
