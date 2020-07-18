import {
  APIGatewayEventRequestContext,
  APIGatewayProxyCallback,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';
import { create200Response } from '../helpers/api-response';
import { logInvoke, logResponse } from '../helpers/logger';
import { putUser } from '../repositories/users-repository';

/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
export async function putItemHandler(
  event: APIGatewayProxyEvent,
  context?: APIGatewayEventRequestContext,
  callback?: APIGatewayProxyCallback,
): Promise<APIGatewayProxyResult> {
  logInvoke(event);

  const body = JSON.parse(event.body);
  const item = await putUser(body);
  const response = create200Response(item);

  logResponse(event, response);

  return response;
}
