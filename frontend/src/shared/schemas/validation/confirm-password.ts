import * as yup from 'yup';

export const confirmPassword = yup
  .string()
  .oneOf([yup.ref('password'), null], 'Passwords must match')
  .required('Confirm password is required');
