import { AxiosError } from 'axios';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FormInput from '../../../components/ui/FormInput';
import SubmitButton from '../../../components/ui/SubmitButton';

interface LoginData {
  email: string;
  password: string;
}
const LoginForm: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    for (const key in loginData) {
      if (!loginData[key as keyof LoginData].trim()) {
        setErrorMessage(`${key} is empty!`);
        return;
      }
    }

    try {
      setErrorMessage('');
      setLoading(true);
      // await login.mutateAsync(loginData);
      navigate('/');
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorCode = error.response.data.code;
        if (errorCode === 40101) {
          setErrorMessage('Please check your email and password.');
        } else {
          setErrorMessage('Failed to login due to an unknown error.');
        }
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-start gap-4'>
      <div className='w-full'>
        <FormInput
          type='email'
          id='login-email'
          name='email'
          label='Email Address'
          value={loginData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className='w-full'>
        <p className='text-sm'>Password</p>
        <FormInput
          type='password'
          id='login-password'
          name='password'
          value={loginData.password}
          onChange={handleInputChange}
        />
      </div>
      <SubmitButton label='Login' disabled={loading} onClick={handleSubmit} />
      {errorMessage && (
        <p className='text-red text-sm font-medium'>{errorMessage}</p>
      )}
    </form>
  );
};

export default LoginForm;
