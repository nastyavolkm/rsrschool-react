import { ErrorMessage } from './ErrorMessage.tsx';
import React, { ChangeEvent } from 'react';

type UploadProps = {
  errors: string | null | undefined;
  apply: (base64: string, file: File) => void;
};

export const Upload: React.FC<UploadProps> = ({
  errors,
  apply,
}: UploadProps) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        apply(reader.result as string, file);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <label htmlFor="upload">
      Upload an avatar
      <input
        accept="image/png,image/jpeg"
        id="upload"
        type="file"
        onChange={handleFileChange}
      />
      <div className="error-wrapper">
        {errors && <ErrorMessage message={errors} />}
      </div>
    </label>
  );
};
