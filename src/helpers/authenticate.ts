import { APIGatewayProxyEvent } from 'aws-lambda';
import { User } from '../models/user';
import { getUser, putUser } from '../repositories/users-repository';
import { ApiError } from './error-handling';

export function authenticate(event: APIGatewayProxyEvent): Promise<User> {
  const header: string | undefined = event.headers['Authorization'];

  if (typeof header !== 'string') {
    throwUnauthorized();
  }

  const [scheme, userId] = header.split(' ');

  if (scheme !== 'Trust') {
    throwUnauthorized();
  }

  return ensureUser(userId);
}

async function ensureUser(userId: string): Promise<User> {
  try {
    const user = await getUser(userId);

    return user;
  } catch (e) {
    console.log('bielik', e);
    if (e instanceof ApiError && e.httpCode === 404) {
      const user: User = {
        id: userId,
      };

      await putUser(user);

      return user;
    }

    throw e;
  }
}

function throwUnauthorized(): void {
  throw new ApiError(401, 'Unauthorized');
}
