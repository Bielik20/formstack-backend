import {
  APIGatewayEventRequestContext,
  APIGatewayProxyCallback,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';
import { handleError } from './error-handling';
import { logInvoke, logResponse } from './logger';

type HandlerFunction = (
  event: APIGatewayProxyEvent,
  context: APIGatewayEventRequestContext,
  callback: APIGatewayProxyCallback,
) => Promise<APIGatewayProxyResult>;

export function wrapRequest(handler: HandlerFunction): HandlerFunction {
  return async (event, context, callback) => {
    try {
      logInvoke(event);

      const response = await handler(event, context, callback);

      logResponse(event, response);

      return response;
    } catch (e) {
      const response = handleError(e);

      logResponse(event, response);

      return response;
    }
  };
}
