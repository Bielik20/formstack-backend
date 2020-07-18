import { DynamoDB } from 'aws-sdk';

const endpoint = process.env.AWS_DYNAMODB_ENDPOINT;
export const docClient = new DynamoDB.DocumentClient({ endpoint });
