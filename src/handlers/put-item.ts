import {
  APIGatewayEventRequestContext,
  APIGatewayProxyCallback,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const tableName = process.env.SAMPLE_TABLE;
const endpoint = process.env.AWS_DYNAMODB_ENDPOINT;
const docClient = new DynamoDB.DocumentClient({ endpoint });

/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
export async function putItemHandler(
  event: APIGatewayProxyEvent,
  context?: APIGatewayEventRequestContext,
  callback?: APIGatewayProxyCallback,
): Promise<APIGatewayProxyResult> {
  if (event.httpMethod !== 'POST') {
    throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
  }
  // All log statements are written to CloudWatch
  console.info('received:', event);

  // Get id and name from the body of the request
  const body = JSON.parse(event.body);
  const id = body.id;
  const name = body.name;

  // Creates a new item, or replaces an old item with a new item
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
  const params = {
    TableName: tableName,
    Item: { id, name },
  };

  const result = await docClient.put(params).promise();

  const response = {
    statusCode: 200,
    body: JSON.stringify(body),
  };

  // All log statements are written to CloudWatch
  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`,
  );
  return response;
}
