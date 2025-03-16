import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectCountries } from '../store/features/countries/countries-slice.tsx';
import { createValidationSchema } from '../utils/validation-schema.tsx';
import { getPasswordStrength } from '../utils/password-strength.tsx';
import { addFormsData } from '../store/features/forms-data/forms-data-slice.tsx';
import { ErrorMessage } from './ErrorMessage.tsx';
import { Upload } from './Upload.tsx';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ReactFormModel } from '../store/models/react-form.model.ts';
import { FormState } from '../store/models/form.model.tsx';

export const ReactHooksForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countriesList = useSelector(selectCountries);
  const validationSchema = createValidationSchema(countriesList);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    trigger,
  } = useForm<ReactFormModel>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });
  const [base64, setBase64] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<string | null>(null);
  const applyFile = (base64: string) => {
    setBase64(base64);
  };

  const handlePasswordStrength = (event: ChangeEvent<HTMLInputElement>) => {
    const pass = event.target.value || '';
    const passwordStrength = getPasswordStrength(pass);
    setPasswordStrength(passwordStrength);
    trigger('confirmedPassword');
  };
  const onSubmitHandler = (data: ReactFormModel) => {
    dispatch(addFormsData({ ...data, upload: base64 } as FormState));
    navigate('/');
  };
  return (
    <div className="component-form-wrapper">
      <Link className="component-form-link" to={'/'}>
        Back to main
      </Link>
      <h3>React Hooks Form</h3>
      <form className="component-form" onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="form-content">
          <label htmlFor="name">
            Name:
            <input
              id="name"
              type="text"
              placeholder="Enter a name"
              defaultValue=""
              {...register('name')}
            />
            <div className="error-wrapper">
              {errors?.name?.message && (
                <ErrorMessage message={errors.name.message} />
              )}
            </div>
          </label>
          <label htmlFor="age">
            Age:
            <input
              id="age"
              type="number"
              placeholder="Enter an age"
              {...register('age', {
                setValueAs: (value) => (value === '' ? null : value),
              })}
            />
            <div className="error-wrapper">
              {errors?.age?.message && (
                <ErrorMessage message={errors.age.message} />
              )}
            </div>
          </label>
          <label htmlFor="email">
            Email:
            <input
              id="email"
              type="string"
              placeholder="Enter an email"
              {...register('email')}
            />
            <div className="error-wrapper">
              {errors?.email?.message && (
                <ErrorMessage message={errors.email.message} />
              )}
            </div>
          </label>
          <label htmlFor="password">
            Password:
            <input
              id="password"
              type="password"
              placeholder="Enter a password"
              {...register('password', {
                onChange: (e) => handlePasswordStrength(e),
              })}
            />
            {passwordStrength && (
              <span className="password-strength">{passwordStrength}</span>
            )}
            <div className="error-wrapper">
              {errors?.password?.message && (
                <ErrorMessage message={errors.password.message} />
              )}
            </div>
          </label>
          <label htmlFor="password-check">
            Confirm your password:
            <input
              id="password-check"
              type="password"
              placeholder="Confirm your password"
              {...register('confirmedPassword')}
            />
            <div className="error-wrapper">
              {errors?.confirmedPassword?.message && (
                <ErrorMessage message={errors.confirmedPassword.message} />
              )}
            </div>
          </label>
          <label htmlFor="gender">
            Gender:
            <select id="gender" defaultValue="" {...register('gender')}>
              <option value="" disabled>
                Select an option ...
              </option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
            <div className="error-wrapper">
              {errors.gender?.message && (
                <ErrorMessage message={errors.gender.message} />
              )}
            </div>
          </label>
          <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <Upload
                errors={errors.upload?.message}
                apply={applyFile}
                name="upload"
                onChange={(file) => onChange(file)}
              />
            )}
            name="upload"
          />
          <label htmlFor="country">
            Country:
            <input
              list="countries"
              id="country"
              type="text"
              placeholder="Enter/Select a country"
              {...register('country')}
            />
            <datalist id="countries">
              {countriesList.map((country) => (
                <option key={country} value={country} />
              ))}
            </datalist>
            <div className="error-wrapper">
              {errors?.country?.message && (
                <ErrorMessage message={errors.country.message} />
              )}
            </div>
          </label>
          <label htmlFor="accept">
            I accept terms and conditions
            <input id="accept" type="checkbox" {...register('accept')} />
            <div className="error-wrapper">
              {errors?.accept?.message && (
                <ErrorMessage message={errors.accept.message} />
              )}
            </div>
          </label>
        </div>
        <input disabled={!isValid} type="submit" value="Submit" />
      </form>
    </div>
  );
};
