export function createError(code, status = 400) {
  const error = new Error(code);
  error.code = code;
  error.status = status;
  return error;
}
// TODO: enhance this to support error chaining and more complex error structures
// if needed in the future