import { docClient } from '../helpers/document-client';
import { User } from '../models/user';

const TableName = 'UsersTable'; // tslint:disable-line:variable-name

export async function getUser(id: string): Promise<User> {
  const params = {
    TableName,
    Key: { id },
  };

  const data = await docClient.get(params).promise();

  return data.Item as User;
}

export async function getUsers(): Promise<User[]> {
  const params = {
    TableName,
  };

  const data = await docClient.scan(params).promise();

  return data.Items as User[];
}

export async function putUser(user: User): Promise<User> {
  const params = {
    TableName,
    Item: user,
  };

  await docClient.put(params).promise();

  return user;
}
