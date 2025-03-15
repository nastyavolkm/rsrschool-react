import React, { useState } from 'react';
import './FullFilledForm.css';
import { FormState } from '../store/models/form.model.tsx';

type FullFilledFormProps = {
  form: FormState;
};
export const FullFilledForm: React.FC<FullFilledFormProps> = ({
  form,
}: FullFilledFormProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handlePasswordClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsPasswordVisible(true);
  };

  return (
    <div className="fullfilled-form">
      <p>
        Name: {form.name} ({form.gender})
      </p>
      <p>Age: {form.age} y.o.</p>
      <p>Email: {form.email}</p>
      <p>Country: {form.country}</p>
      <p>Accepted terms: {form.accept ? 'Yes' : 'No'}</p>
      <p>
        Password:{' '}
        {isPasswordVisible ? (
          form.password
        ) : (
          <button onClick={handlePasswordClick}>Show password</button>
        )}
      </p>
      <p>
        Uploaded file:{' '}
        <img
          className="fullfilled-form-image"
          src={form.upload as string}
          alt="Image"
        />
      </p>
    </div>
  );
};
