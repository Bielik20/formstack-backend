import {
  APIGatewayEventRequestContext,
  APIGatewayProxyCallback,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';
import { create200Response } from '../helpers/api-response';
import { logInvoke, logResponse } from '../helpers/logger';
import { getUser } from '../repositories/users-repository';

/**
 * A simple example includes a HTTP get method to get one item by id from a DynamoDB table.
 */
export async function getByIdHandler(
  event: APIGatewayProxyEvent,
  context?: APIGatewayEventRequestContext,
  callback?: APIGatewayProxyCallback,
): Promise<APIGatewayProxyResult> {
  logInvoke(event);

  const id = event.pathParameters.id;
  const item = await getUser(id);
  const response = create200Response(item);

  logResponse(event, response);

  return response;
}
