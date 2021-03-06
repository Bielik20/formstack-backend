import * as lambda from '@src/handlers/users/put-user';
import { DynamoDB } from 'aws-sdk';

// This includes all tests for putUserHandler()
describe('Test putUserHandler', () => {
  let putSpy;

  // Test one-time setup and teardown, see more in https://jestjs.io/docs/en/setup-teardown
  beforeAll(() => {
    // Mock dynamodb get and put methods
    // https://jestjs.io/docs/en/jest-object.html#jestspyonobject-methodname
    putSpy = jest.spyOn(DynamoDB.DocumentClient.prototype, 'put');
  });

  // Clean up mocks
  afterAll(() => {
    putSpy.mockRestore();
  });

  // This test invokes putUserHandler() and compare the result
  it('should add id to the table', async () => {
    const returnedItem = { id: 'id1', name: 'name1' };

    // Return the specified value whenever the spied put function is called
    putSpy.mockReturnValue({
      promise: () => Promise.resolve(returnedItem),
    });

    const event = {
      httpMethod: 'POST',
      body: '{"id": "id1","name": "name1"}',
    };

    // Invoke putUserHandler()
    const result = await lambda.putUserHandler(event as any, {} as any, {} as any);
    const expectedResult = {
      statusCode: 200,
      body: JSON.stringify({ id: 'id1' }),
    };

    // Compare the result with the expected result
    expect(result).toEqual(expectedResult);
  });
});
