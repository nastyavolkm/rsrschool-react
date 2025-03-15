import React from 'react';
import './ErrorMessage.css';

type ErrorMessageProps = {
  message: string;
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
}: ErrorMessageProps) => {
  return <p className="error-message">{message}</p>;
};
