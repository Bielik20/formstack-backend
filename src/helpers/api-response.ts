import { APIGatewayProxyResult } from 'aws-lambda';

export function createErrorResponse(status: number, message: string): APIGatewayProxyResult {
  return createApiResponse(status, { message });
}

export function create200Response(body?: any): APIGatewayProxyResult {
  return createApiResponse(200, body);
}

function createApiResponse(status: number, body?: any): APIGatewayProxyResult {
  return {
    statusCode: status,
    body: JSON.stringify(body),
  };
}
