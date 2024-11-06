import { HttpException } from "../exceptions";

export class SoapError {
  public handle(error: any) {
    if (error instanceof HttpException) {
      throw {
        Fault: {
          faultcode: "Error",
          statusCode: error.status,
          faultstring: error.message,
        },
      };
    }
  }
}
