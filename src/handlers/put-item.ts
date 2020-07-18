import {
  APIGatewayEventRequestContext,
  APIGatewayProxyCallback,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';
import { create200Response } from '../helpers/api-response';
import { handleError } from '../helpers/error-handling';
import { logInvoke, logResponse } from '../helpers/logger';
import { validateBody } from '../helpers/validate-body';
import { UserYup } from '../models/user.yup';
import { putUser } from '../repositories/users-repository';

/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
export async function putItemHandler(
  event: APIGatewayProxyEvent,
  context?: APIGatewayEventRequestContext,
  callback?: APIGatewayProxyCallback,
): Promise<APIGatewayProxyResult> {
  try {
    logInvoke(event);

    const body = await validateBody(event, UserYup);
    const item = await putUser(body);
    const response = create200Response(item);

    logResponse(event, response);

    return response;
  } catch (e) {
    return handleError(e);
  }
}
