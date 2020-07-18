import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export function logInvoke(event: APIGatewayProxyEvent): void {
  console.info('invoked:', event);
}

export function logResponse(event: APIGatewayProxyEvent, response: APIGatewayProxyResult): void {
  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`,
  );
}
