import { DynamoDB } from 'aws-sdk';
import * as faker from 'faker';
import { User } from '../src/models/user';
import { UserVinyl } from '../src/models/user-vinyl';
import { Vinyl } from '../src/models/vinyl';

export async function createUsersVinyls(users: User[], vinyls: Vinyl[]): Promise<UserVinyl[]> {
  const docClient = new DynamoDB.DocumentClient();
  const records: UserVinyl[] = [];

  users.forEach((user) => {
    records.push(
      ...vinyls
        .filter(() => shouldAssign())
        .map((vinyl) => ({ userId: user.id, vinylId: vinyl.id })),
    );
  });

  await Promise.all(
    records
      .map((record) => ({ TableName: 'UsersVinylsTable', Item: record }))
      .map((doc) => docClient.put(doc).promise()),
  );

  return records;
}

function shouldAssign(): boolean {
  return faker.random.number({ min: 0, max: 4 }) === 0;
}
