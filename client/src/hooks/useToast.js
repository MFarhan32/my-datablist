import { useState } from 'react';

export const useToast = () => {
  const [message, setMessage] = useState('');
  const showToast = (value) => {
    setMessage(value);
    setTimeout(() => setMessage(''), 2500);
  };
  return { message, showToast };
};
