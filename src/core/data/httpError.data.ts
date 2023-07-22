import { IHttpErrorItem } from "../interface/IHttpError";

export const HttpErrorsData: Record<string, IHttpErrorItem> = {
  BAD_REQUEST: {
    status: 400,
    code: "BAD_REQUEST",
    message: "Bad Request",
    // description:
    //   "The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications.",
  },
  VALIDATION_FAILED: {
    status: 400,
    code: "VALIDATION_FAILED",
    message: "Validation Failed for the request",
    description:
      "The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications.",
  },
  UNAUTHORIZED: {
    status: 401,
    code: "UNAUTHORIZED",
    message: "Unauthorized",
    description:
      "The request requires user authentication. The response MUST include a Authorization header field containing a token applicable to the requested resource. The client MAY repeat the request with a suitable Authorization header field. If the request already included Authorization credentials, then the 401 response indicates that authorization has been refused for those credentials.",
  },
  FORBIDDEN: {
    status: 403,
    code: "FORBIDDEN",
    message: "Forbidden",
    description:
      "The server understood the request, but is refusing to fulfill it.",
  },
  NOT_FOUND: {
    status: 404,
    code: "NOT_FOUND",
    message: "Not Found",
    description: "The server has not found anything matching the Request-URI.",
  },
  METHOD_NOT_ALLOWED: {
    status: 405,
    code: "METHOD_NOT_ALLOWED",
    message: "Method Not Allowed",
  },
  NOT_ACCEPTABLE: {
    status: 406,
    code: "NOT_ACCEPTABLE",
    message: "Not Acceptable",
    description: "not allowed to perform the action",
  },
  INTERNAL_SERVER_ERROR: {
    status: 500,
    code: "INTERNAL_SERVER_ERROR",
    message: "Internal Server Error",
    description:
      "The server encountered an unexpected condition which prevented it from fulfilling the request.",
  },
  DATABASE_ERROR: {
    status: 500,
    code: "INTERNAL_SERVER_ERROR",
    message: "Database error has ocurred",
    description:
      "The server encountered an unexpected condition which prevented it from fulfilling the request.",
  },
  ALREADY_EXISTS: {
    status: 400,
    code: "ALREADY_EXISTS",
    message: "Already exists",
  },
};
