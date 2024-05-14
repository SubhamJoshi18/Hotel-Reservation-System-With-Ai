import { statusConstant } from "../constants/statusConstant";
const { FAIL, SUCCESS, ERROR } = statusConstant;
class AppError extends Error {
  statusCode: any;
  status: string;
  constructor(message: string, statusCode: any) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${this.statusCode}`.startsWith("4") ? FAIL : ERROR;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
