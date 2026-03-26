import { ERRORS } from "../../../shared/src/constants/errors.js";

export function createError(code, status = 400) {
  const error = new Error(code);
  error.code = code;
  error.status = status;
  return error;
}