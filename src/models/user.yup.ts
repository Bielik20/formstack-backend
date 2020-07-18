import * as Yup from 'yup';
import { User } from './user';

export const UserYup = Yup.object<User>({
  id: Yup.string().required(),
  email: Yup.string().email().required(),
});
