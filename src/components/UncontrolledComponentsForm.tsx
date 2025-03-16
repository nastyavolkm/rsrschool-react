import React, { createRef, FormEvent, useState } from 'react';
import './UncontrolledComponentsForm.css';
import { createValidationSchema } from '../utils/validation-schema.tsx';
import { ErrorMessage } from './ErrorMessage.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectCountries } from '../store/features/countries/countries-slice.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { Upload } from './Upload.tsx';
import { addFormsData } from '../store/features/forms-data/forms-data-slice.tsx';
import { ValidationError } from 'yup';
import { FormState } from '../store/models/form.model.tsx';
import { getPasswordStrength } from '../utils/password-strength.tsx';

export const UncontrolledComponentsForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = createRef<HTMLInputElement | null>();
  const age = createRef<HTMLInputElement | null>();
  const gender = createRef<HTMLSelectElement | null>();
  const email = createRef<HTMLInputElement | null>();
  const password = createRef<HTMLInputElement | null>();
  const confirmedPassword = createRef<HTMLInputElement | null>();
  const country = createRef<HTMLInputElement | null>();
  const accept = createRef<HTMLInputElement>();
  const [errors, setErrors] = useState<Record<string, string> | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [base64, setBase64] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<string | null>(null);
  const countriesList = useSelector(selectCountries);
  const applyFile = (base64: string, file: File) => {
    setFile(file);
    setBase64(base64);
  };
  const validationSchema = createValidationSchema(countriesList);

  const handlePasswordStrength = () => {
    const pass = password.current?.value || '';
    const passwordStrength = getPasswordStrength(pass);
    if (passwordStrength) {
      setPasswordStrength(passwordStrength);
    }
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      name: name.current?.value || null,
      email: email.current?.value || null,
      age: age.current?.value || null,
      gender: gender.current?.value || null,
      upload: file,
      country: country.current?.value || null,
      accept: accept.current?.checked || false,
      password: password.current?.value || null,
      confirmedPassword: confirmedPassword.current?.value || null,
    } as FormState;

    validationSchema
      .validate(data, { abortEarly: false })
      .then(() => {
        setErrors(null);
        dispatch(addFormsData({ ...data, upload: base64 }));
        navigate('/');
      })
      .catch((err) => {
        const validationErrors: Record<string, string> = {};
        err.inner.forEach((error: ValidationError) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        setErrors(validationErrors);
      });
  };
  return (
    <div className="component-form-wrapper">
      <Link className="component-form-link" to={'/'}>
        Back to main
      </Link>
      <h3>Uncontrolled Components Form</h3>
      <form className="component-form" onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <input
            id="name"
            type="text"
            ref={name}
            name="name"
            placeholder="Enter a name"
          />
          <div className="error-wrapper">
            {errors?.name && <ErrorMessage message={errors.name} />}
          </div>
        </label>
        <label htmlFor="age">
          Age:
          <input
            id="age"
            type="number"
            ref={age}
            name="age"
            placeholder="Enter an age"
          />
          <div className="error-wrapper">
            {errors?.age && <ErrorMessage message={errors.age} />}
          </div>
        </label>
        <label htmlFor="email">
          Email:
          <input
            id="email"
            type="string"
            ref={email}
            name="email"
            placeholder="Enter an email"
          />
          <div className="error-wrapper">
            {errors?.email && <ErrorMessage message={errors.email} />}
          </div>
        </label>
        <label htmlFor="password">
          Password:
          <input
            id="password"
            type="password"
            ref={password}
            name="password"
            placeholder="Enter a password"
            onChange={handlePasswordStrength}
          />
          {passwordStrength && (
            <span className="password-strength">{passwordStrength}</span>
          )}
          <div className="error-wrapper">
            {errors?.password && <ErrorMessage message={errors.password} />}
          </div>
        </label>
        <label htmlFor="password-check">
          Confirm your password:
          <input
            id="password-check"
            type="password"
            ref={confirmedPassword}
            name="confirmedPassword"
            placeholder="Confirm your password"
          />
          <div className="error-wrapper">
            {errors?.confirmedPassword && (
              <ErrorMessage message={errors.confirmedPassword} />
            )}
          </div>
        </label>
        <label htmlFor="gender">
          Gender:
          <select
            id="gender"
            defaultValue={'default'}
            ref={gender}
            name="gender"
          >
            <option value="default" disabled>
              Select an option ...
            </option>
            <option>female</option>
            <option>male</option>
            <option>other</option>
          </select>
          <div className="error-wrapper">
            {errors?.gender && <ErrorMessage message={errors.gender} />}
          </div>
        </label>
        <Upload errors={errors?.upload} apply={applyFile} />
        <label htmlFor="country">
          Country:
          <input
            list="countries"
            id="country"
            type="text"
            ref={country}
            name="country"
            placeholder="Start typing a country"
          />
          <datalist id="countries">
            {countriesList.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
          <div className="error-wrapper">
            {errors?.country && <ErrorMessage message={errors.country} />}
          </div>
        </label>
        <label htmlFor="accept">
          I accept terms and conditions
          <input id="accept" type="checkbox" ref={accept} name="accept" />
          <div className="error-wrapper">
            {errors?.accept && <ErrorMessage message={errors.accept} />}
          </div>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};
