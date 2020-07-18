import { create200Response } from '../../helpers/api-response';
import { authenticate } from '../../helpers/authenticate';
import { wrapRequest } from '../../helpers/wrap-request';
import { getVinylsOfUser, searchVinyls } from '../../repositories/vinyls-repository';

export const getMyVinylsHandler = wrapRequest(async (event) => {
  const user = await authenticate(event);
  const vinyls = await getVinylsOfUser(user.id);

  return create200Response(vinyls);
});
