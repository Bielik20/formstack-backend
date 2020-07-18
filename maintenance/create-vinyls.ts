import { DynamoDB } from 'aws-sdk';
import { Vinyl } from '../src/models/vinyl';
import * as faker from 'faker';

export async function createVinyls(): Promise<Vinyl[]> {
  const docClient = new DynamoDB.DocumentClient();
  const vinyls = Array.from({ length: 1000 }).map(() => generateVinyl());

  await Promise.all(
    vinyls
      .map((vinyl) => ({ TableName: 'VinylsTable', Item: vinyl }))
      .map((doc) => docClient.put(doc).promise()),
  );

  return vinyls;
}

function generateVinyl(): Vinyl {
  return {
    id: faker.random.uuid(),
    album: faker.lorem.words(2),
    artist: faker.lorem.words(2),
    cover: faker.image.image(),
  };
}
