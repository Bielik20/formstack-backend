import { config } from 'aws-sdk';
// @ts-ignore
import faker from 'faker';
import { createTables } from './create-tables';
import { createUsers } from './create-users';
import { createUsersVinyls } from './create-users-vinyls';
import { createVinyls } from './create-vinyls';

(async () => {
  faker.seed(10);
  config.update({
    region: 'eu-central-1',
    endpoint: 'http://localhost:8000',
  } as any);

  await createTables();

  const users = await createUsers();
  const vinyls = await createVinyls();
  const usersVinyls = await createUsersVinyls(users, vinyls);

  console.log(users, vinyls, usersVinyls);
})();
