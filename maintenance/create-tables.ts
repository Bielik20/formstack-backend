import { DynamoDB } from 'aws-sdk';

export async function createTables(): Promise<void> {
  const ddb = new DynamoDB();

  const usersTable = {
    TableName: 'UsersTable',
    KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
    AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
  };
  const vinylsTable = {
    TableName: 'VinylsTable',
    KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
    AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
  };
  const usersVinylsTable = {
    TableName: 'UsersVinylsTable',
    KeySchema: [
      { AttributeName: 'userId', KeyType: 'HASH' },
      { AttributeName: 'vinylId', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'userId', AttributeType: 'S' },
      { AttributeName: 'vinylId', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
  };

  await ddb.createTable(usersTable).promise();
  await ddb.createTable(vinylsTable).promise();
  await ddb.createTable(usersVinylsTable).promise();
}
