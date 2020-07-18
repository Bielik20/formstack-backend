import { APIGatewayProxyResult } from 'aws-lambda';
import { createErrorResponse } from './api-response';

export class ApiError extends Error {
  readonly httpCode: number;

  constructor(httpCode: number, description: string) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.httpCode = httpCode;

    Error.captureStackTrace(this);
  }
}

export function handleError(error: Error): APIGatewayProxyResult {
  if (!(error instanceof ApiError)) {
    throw error;
  }

  return createErrorResponse(error.httpCode, error.message);
}
