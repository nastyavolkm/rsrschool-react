import React, { ChangeEvent, FormEvent, useState } from 'react';
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
  const [errors, setErrors] = useState<Record<string, string> | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<string | null>(null);
  const countriesList = useSelector(selectCountries);
  const validationSchema = createValidationSchema(countriesList);

  const handlePasswordStrength = (event: ChangeEvent<HTMLInputElement>) => {
    const pass = event.target.value || '';
    const passwordStrength = getPasswordStrength(pass);
    if (passwordStrength) {
      setPasswordStrength(passwordStrength);
    }
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const file = formData.get('upload') as File | null;
    let base64: string | null = null;

    const convertFileToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };

    const processFormData = async () => {
      if (file && file instanceof File && file.size > 0) {
        base64 = await convertFileToBase64(file);
      }
      const data: FormState = {
        name: (formData.get('name') as string) || null,
        email: (formData.get('email') as string) || null,
        age: (formData.get('age') as unknown as number) || null,
        gender: (formData.get('gender') as 'male' | 'female' | 'other') || null,
        upload: file,
        country: (formData.get('country') as string) || null,
        accept: formData.get('accept') === 'on',
        password: (formData.get('password') as string) || null,
        confirmedPassword:
          (formData.get('confirmedPassword') as string) || null,
      };

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
    processFormData();
  };
  return (
    <div className="component-form-wrapper">
      <Link className="component-form-link" to={'/'}>
        Back to main
      </Link>
      <h3>Uncontrolled Components Form</h3>
      <form className="component-form" onSubmit={handleSubmit}>
        <div className="form-content">
          <label htmlFor="name">
            Name:
            <input
              id="name"
              type="text"
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
            <select id="gender" defaultValue={'default'} name="gender">
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
          <Upload errors={errors?.upload} name="upload" />
          <label htmlFor="country">
            Country:
            <input
              list="countries"
              id="country"
              type="text"
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
            <input id="accept" type="checkbox" name="accept" />
            <div className="error-wrapper">
              {errors?.accept && <ErrorMessage message={errors.accept} />}
            </div>
          </label>
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};
