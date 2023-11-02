import * as Yup from 'yup';
export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email()
    .min(2, 'Email has to contain more than 2 letters')
    .max(50, 'Email has to contain less than 50 letters'),
  password: Yup.string()
    .required()
    .min(6, 'Password has to contain more than 6 letters')
    .max(15, 'Password has to contain less than 15 letters'),
});
