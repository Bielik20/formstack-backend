import {
  APIGatewayEventRequestContext,
  APIGatewayProxyCallback,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const tableName = 'UsersTable';
const endpoint = process.env.AWS_DYNAMODB_ENDPOINT;
const docClient = new DynamoDB.DocumentClient({ endpoint });

/**
 * A simple example includes a HTTP get method to get one item by id from a DynamoDB table.
 */
export async function getByIdHandler(
  event: APIGatewayProxyEvent,
  context?: APIGatewayEventRequestContext,
  callback?: APIGatewayProxyCallback,
): Promise<APIGatewayProxyResult> {
  if (event.httpMethod !== 'GET') {
    throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`);
  }
  // All log statements are written to CloudWatch
  console.info('received:', event);

  // Get id from pathParameters from APIGateway because of `/{id}` at template.yml
  const id = event.pathParameters.id;

  // Get the item from the table
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#get-property
  const params = {
    TableName: tableName,
    Key: { id },
  };
  const data = await docClient.get(params).promise();
  const item = data.Item;

  const response = {
    statusCode: 200,
    body: JSON.stringify(item),
  };

  // All log statements are written to CloudWatch
  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`,
  );
  return response;
}
