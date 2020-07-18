import { create200Response } from '../../helpers/api-response';
import { wrapRequest } from '../../helpers/wrap-request';
import { getVinyl } from '../../repositories/vinyls-repository';

export const getVinylByIdHandler = wrapRequest(async (event) => {
  const id = event.pathParameters.id;
  console.log('bielik', id);
  const vinyls = await getVinyl(id);

  return create200Response(vinyls);
});
