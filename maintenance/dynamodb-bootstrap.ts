import { DynamoDB, config } from 'aws-sdk';

config.update({
  region: 'eu-central-1',
  endpoint: 'http://localhost:8000',
} as any);

const ddb = new DynamoDB();
const docClient = new DynamoDB.DocumentClient();

async function createUsers(): Promise<void> {
  const usersTable = {
    TableName: 'UsersTable',
    KeySchema: [
      { AttributeName: 'id', KeyType: 'HASH' },
      { AttributeName: 'email', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'id', AttributeType: 'S' },
      { AttributeName: 'email', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
  };

  await ddb.createTable(usersTable).promise();

  const users = [
    { email: 'bill.smith@example.com', id: '1' },
    { email: 'john.smith@example.com', id: '2' },
  ];

  await Promise.all(
    users
      .map((user) => ({ TableName: 'UsersTable', Item: user }))
      .map((doc) => docClient.put(doc).promise()),
  );
}

(async () => {
  await createUsers();
})();
