import * as lambda from '@src/handlers/users/get-user-by-id';
import { DynamoDB } from 'aws-sdk';

// This includes all tests for getUserByIdHandler()
describe('Test getUserByIdHandler', () => {
  let getSpy;

  // Test one-time setup and teardown, see more in https://jestjs.io/docs/en/setup-teardown
  beforeAll(() => {
    // Mock dynamodb get and put methods
    // https://jestjs.io/docs/en/jest-object.html#jestspyonobject-methodname
    getSpy = jest.spyOn(DynamoDB.DocumentClient.prototype, 'get');
  });

  // Clean up mocks
  afterAll(() => {
    getSpy.mockRestore();
  });

  // This test invokes getUserByIdHandler() and compare the result
  it('should get item by id', async () => {
    const item = { id: 'id1' };

    // Return the specified value whenever the spied get function is called
    getSpy.mockReturnValue({
      promise: () => Promise.resolve({ Item: item }),
    });

    const event = {
      httpMethod: 'GET',
      pathParameters: {
        id: 'id1',
      },
    };

    // Invoke getUserByIdHandler()
    const result = await lambda.getUserByIdHandler(event as any, {} as any, {} as any);

    const expectedResult = {
      statusCode: 200,
      body: JSON.stringify(item),
    };

    // Compare the result with the expected result
    expect(result).toEqual(expectedResult);
  });
});
