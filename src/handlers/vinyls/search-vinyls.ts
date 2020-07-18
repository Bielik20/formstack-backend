import { create200Response } from '../../helpers/api-response';
import { wrapRequest } from '../../helpers/wrap-request';
import { searchVinyls } from '../../repositories/vinyls-repository';

export const searchVinylsHandler = wrapRequest(async (event) => {
  const search = event.queryStringParameters.search;
  const vinyls = await searchVinyls(search);

  return create200Response(vinyls);
});
