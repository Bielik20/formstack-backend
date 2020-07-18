import { create200Response } from '../../helpers/api-response';
import { wrapRequest } from '../../helpers/wrap-request';
import { getUsers } from '../../repositories/users-repository';

export const getAllUsersHandler = wrapRequest(async () => {
  const users = await getUsers();

  return create200Response(users);
});
