import { ErrorMessage } from './ErrorMessage.tsx';
import React, { ChangeEvent, useRef } from 'react';

type UploadProps = {
  errors: string | null | undefined;
  name: string;
  apply?: (base64: string, file: File) => void;
  onChange?: (value: File | null) => void;
};

export const Upload: React.FC<UploadProps> = ({
  errors,
  name,
  apply,
  onChange,
}: UploadProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (apply) {
          apply(reader.result as string, file);
        }
      };
      reader.readAsDataURL(file);
      if (onChange) {
        onChange(file);
      }
    }
  };
  return (
    <label htmlFor="upload">
      Upload an avatar
      <input
        accept="image/png,image/jpeg"
        id="upload"
        type="file"
        ref={fileInputRef}
        name={name}
        onChange={apply && handleFileChange}
      />
      <div className="error-wrapper">
        {errors && <ErrorMessage message={errors} />}
      </div>
    </label>
  );
};
