import { create200Response } from '../helpers/api-response';
import { authenticate } from '../helpers/authenticate';
import { wrapRequest } from '../helpers/wrap-request';
import { getUsers } from '../repositories/users-repository';

export const getAllItemsHandler = wrapRequest(async (event) => {
  const authUser = await authenticate(event);
  const users = await getUsers();

  return create200Response(users);
});
