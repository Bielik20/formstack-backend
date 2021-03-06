import { docClient } from '../helpers/document-client';
import { ApiError } from '../helpers/error-handling';
import { Vinyl } from '../models/vinyl';
import { VinylYup } from '../models/vinyl.yup';
import { getVinylIdsOfUser } from './users-vinyls-repository';

const TableName = 'VinylsTable';

export async function getVinyl(id: string): Promise<Vinyl> {
  const params = {
    TableName,
    Key: { id },
  };

  const data = await docClient.get(params).promise();

  if (!data.Item) {
    throw new ApiError(404, "Vinyl doesn't exist");
  }

  return VinylYup.cast(data.Item);
}

export async function getVinyls(): Promise<Vinyl[]> {
  const params = {
    TableName,
  };

  const data = await docClient.scan(params).promise();

  return data.Items.map((item) => VinylYup.cast(item));
}

export async function getVinylsOfUser(userId: string): Promise<Vinyl[]> {
  const vinylIds = await getVinylIdsOfUser(userId);

  return await Promise.all(vinylIds.map((id) => getVinyl(id)));
}

// elastic search doesn't work on localhost, let's pretend it is it
export async function searchVinyls(search: string): Promise<Vinyl[]> {
  const vinyls = await getVinyls();
  const searchLower = search.toLowerCase();

  return vinyls.filter((vinyl) =>
    `${vinyl.artist} ${vinyl.album}`.toLowerCase().includes(searchLower),
  );
}
