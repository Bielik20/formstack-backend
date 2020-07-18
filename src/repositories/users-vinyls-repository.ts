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
