import { docClient } from '../helpers/document-client';

const TableName = 'UsersVinylsTable';

export async function getVinylIdsOfUser(userId: string): Promise<string[]> {
  const params = {
    TableName,
    KeyConditionExpression: 'userId = :u',
    ExpressionAttributeValues: {
      ':u': userId,
    },
  };

  const data = await docClient.query(params).promise();

  return data.Items.map((item) => item.vinylId);
}

export async function addVinylOfUser(userId: string, vinylId: string): Promise<void> {
  const param = {
    TableName,
    Item: { userId, vinylId },
  };

  await docClient.put(param).promise();
}

export async function removeVinylOfUser(userId: string, vinylId: string): Promise<void> {
  const param = {
    TableName,
    Key: { userId, vinylId },
  };

  await docClient.delete(param).promise();
}
