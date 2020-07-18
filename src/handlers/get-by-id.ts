import { create200Response } from '../helpers/api-response';
import { wrapRequest } from '../helpers/wrap-request';
import { getUser } from '../repositories/users-repository';

export const getByIdHandler = wrapRequest(async (event) => {
  const id = event.pathParameters.id;
  const user = await getUser(id);

  return create200Response(user);
});
