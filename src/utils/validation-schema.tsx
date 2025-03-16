import * as Yup from 'yup';

export const createValidationSchema = (countries: string[]) =>
  Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .matches(
        /^[A-ZА-Я][a-zа-яA-ZА-Я]*(\s[A-ZА-Я][a-zа-яA-ZА-Я]*)*$/,
        'Name should start with uppercase letter'
      ),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required')
      .matches(
        RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
        'Invalid email format'
      ),
    password: Yup.string()
      .matches(
        RegExp('(.*[a-z].*)'),
        'Should contain at least one latin lowercase letter'
      )
      .matches(
        RegExp('(.*[A-Z].*)'),
        'Should contain at least one latin uppercase letter'
      )
      .matches(RegExp('(.*\\d.*)'), 'Should contain at least one digit')
      .matches(
        RegExp('[!@#$%^&*(),.?":{}|<>]'),
        'Should contain at least one special character'
      )
      .required('Password is required'),
    confirmedPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
    age: Yup.number()
      .required('Age is required')
      .min(0, 'Age should be not less than 0'),
    accept: Yup.boolean().oneOf([true], 'Accept terms is required'),
    country: Yup.string()
      .required('Country is required')
      .oneOf(countries, 'Country should be selected from the list'),
    gender: Yup.string()
      .required('Gender is required')
      .oneOf(['male', 'female', 'other'], 'One option should be selected'),
    upload: Yup.mixed()
      .required('Picture is required')
      .test('fileSize', 'File too large: max 5MB', (value) => {
        return value && (value as File).size <= 5000000;
      })
      .test('fileType', 'Unsupported Format: choose png or jpeg', (value) => {
        return (
          value && ['image/png', 'image/jpeg'].includes((value as File).type)
        );
      }),
  });
