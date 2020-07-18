import { DynamoDB } from 'aws-sdk';
import { User } from '../src/models/user';

export async function createUsers(): Promise<User[]> {
  const docClient = new DynamoDB.DocumentClient();
  const users = [{ id: 'bill.smith@example.com' }, { id: 'john.smith@example.com' }];

  await Promise.all(
    users
      .map((user) => ({ TableName: 'UsersTable', Item: user }))
      .map((doc) => docClient.put(doc).promise()),
  );

  return users;
}
