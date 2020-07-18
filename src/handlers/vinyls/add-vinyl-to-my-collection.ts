import { create204Response } from '../../helpers/api-response';
import { authenticate } from '../../helpers/authenticate';
import { wrapRequest } from '../../helpers/wrap-request';
import { addVinylOfUser } from '../../repositories/users-vinyls-repository';

export const addVinylToMyCollectionHandler = wrapRequest(async (event) => {
  const user = await authenticate(event);
  const vinylId = event.pathParameters.id;

  await addVinylOfUser(user.id, vinylId);

  return create204Response();
});
