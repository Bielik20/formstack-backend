import { docClient } from '../helpers/document-client';
import { ApiError } from '../helpers/error-handling';
import { User } from '../models/user';
import { UserYup } from '../models/user.yup';

const TableName = 'UsersTable';

export async function getUser(id: string): Promise<User> {
  const params = {
    TableName,
    Key: { id },
  };

  const data = await docClient.get(params).promise();

  if (!data.Item) {
    throw new ApiError(404, "User doesn't exist");
  }

  return UserYup.cast(data.Item);
}

export async function getUsers(): Promise<User[]> {
  const params = {
    TableName,
  };

  const data = await docClient.scan(params).promise();

  return data.Items.map((item) => UserYup.cast(item));
}

export async function putUser(user: User): Promise<User> {
  const params = {
    TableName,
    Item: user,
  };

  await docClient.put(params).promise();

  return UserYup.cast(user);
}
