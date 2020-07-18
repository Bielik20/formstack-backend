import { create200Response } from '../../helpers/api-response';
import { validateBody } from '../../helpers/validate-body';
import { wrapRequest } from '../../helpers/wrap-request';
import { UserYup } from '../../models/user.yup';
import { putUser } from '../../repositories/users-repository';

export const putUserHandler = wrapRequest(async (event) => {
  const body = await validateBody(event, UserYup);
  const user = await putUser(body);

  return create200Response(user);
});
