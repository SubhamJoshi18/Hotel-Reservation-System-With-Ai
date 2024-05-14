import { HttpStatusCode } from "axios";
import { statusConstant } from "../../constants/statusConstant";
const { SUCCESS, FAIL, ERROR } = statusConstant;
import { Response } from "express";

interface response {
  status: string;
  message: string;
  data?: any;
}

export const sendResponse = (
  res: Response,
  statusCode: HttpStatusCode,
  message: string,
  data: any = null
) => {
  const response: response = {
    status: testStatusCode(statusCode),
    message: message,
  };
  if (data && data !== null) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};

const testStatusCode = (statusCode: number | undefined): string => {
  if (`${statusCode}`.startsWith("2")) {
    return SUCCESS;
  } else if (`${statusCode}`.startsWith("4")) {
    return FAIL;
  } else {
    return ERROR;
  }
};
