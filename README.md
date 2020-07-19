# formstack-backend

## Requirements

* AWS SAM CLI - [Install the AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html).
* Node.js - [Install Node.js 12](https://nodejs.org/en/), including the npm package management tool.
* Docker - [Install Docker community edition](https://hub.docker.com/search/?type=edition&offering=community).

## Local Development

### Server

To start a local server:

```bash
npm ci
npm run build
```

The AWS SAM CLI can also emulate your application's API. Use the `sam local start-api` command to run the API locally on port 3000.

```bash
sam local start-api
```

### DynamoDb

To start a local instance of DynamoDb run (and keep running):

```bash
docker run -p 8000:8000 amazon/dynamodb-local
```

To bootstrap dynamodb data

```bash
npm run dynamodb-bootstrap
```

> Docker's instance doesn't persist data, so after you break your docker run you need to run bootstrap script again.

### Testing

Now, that you have your server and database going you may try with the application.

Endpoints are described in `template.yml`.
Alternatively you can use `events/formstack-backend.postman_collection.json` execute http requests from postman.

#### Authentication

Application has a very simplified form of authentication called "Trust Authentication".
In your Authorization header you put:

```
Trust ${userId}
```

Server will trust you, that you are who you claim to be.

## Unit tests

Tests are defined in the `__tests__` folder in this project. Use `npm` to install the [Jest test framework](https://jestjs.io/) and run unit tests.

```bash
my-application$ npm install
my-application$ npm run test
```
