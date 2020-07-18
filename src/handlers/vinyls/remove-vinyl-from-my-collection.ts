import { create204Response } from '../../helpers/api-response';
import { authenticate } from '../../helpers/authenticate';
import { wrapRequest } from '../../helpers/wrap-request';
import { removeVinylOfUser } from '../../repositories/users-vinyls-repository';

export const removeVinylFromMyCollectionHandler = wrapRequest(async (event) => {
  const user = await authenticate(event);
  const vinylId = event.pathParameters.id;

  await removeVinylOfUser(user.id, vinylId);

  return create204Response();
});
