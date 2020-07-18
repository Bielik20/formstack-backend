import {
  APIGatewayEventRequestContext,
  APIGatewayProxyCallback,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';
import { create200Response } from '../helpers/api-response';
import { logInvoke, logResponse } from '../helpers/logger';
import { getUsers } from '../repositories/users-repository';

/**
 * A simple example includes a HTTP get method to get all items from a DynamoDB table.
 */
export async function getAllItemsHandler(
  event: APIGatewayProxyEvent,
  context?: APIGatewayEventRequestContext,
  callback?: APIGatewayProxyCallback,
): Promise<APIGatewayProxyResult> {
  logInvoke(event);

  const items = await getUsers();
  const response = create200Response(items);

  logResponse(event, response);

  return response;
}
