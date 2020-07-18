import { APIGatewayProxyEvent } from 'aws-lambda';
import { ObjectSchema } from 'yup';
import { ApiError } from './error-handling';

export async function validateBody<T extends object>(
  event: APIGatewayProxyEvent,
  Schema?: ObjectSchema<T>,
): Promise<T> {
  if (!event.body) {
    throw new ApiError(400, 'Missing body');
  }

  try {
    const body = JSON.parse(event.body);

    if (!Schema) {
      return body;
    }

    return await Schema.validate(body, { stripUnknown: true });
  } catch (e) {
    throw new ApiError(400, 'Invalid body');
  }
}
