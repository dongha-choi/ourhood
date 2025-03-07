import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import FormInput from '../components/ui/FormInput';
import useAuth from '../hooks/useAuth';
import { AxiosError } from 'axios';

interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { login } = useAuth();
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState<string>('');
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
        setErrorMsg(`${key} is empty!`);
        return;
      }
    }

    try {
      setErrorMsg('');
      setLoading(true);
      await login(loginData);
      navigate('/');
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorCode = error.response.data.code;
        if (errorCode === 40101) {
          setErrorMsg('Please check your email and password.');
        } else {
          setErrorMsg('Failed to login due to an unknown error.');
        }
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className='w-full mt-4 flex flex-col items-center text-lg'>
      <div className='w-80 max-w-100'>
        <div className='my-4 text-center text-2xl font-bold text-brand'>
          Login
        </div>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col items-start gap-4'
        >
          <FormInput
            type='email'
            id='email'
            name='email'
            value={loginData.email}
            label='Enter your email'
            onChange={handleInputChange}
          />
          <FormInput
            type='password'
            id='password'
            name='password'
            value={loginData.password}
            label='Create a password'
            onChange={handleInputChange}
          />
          <Button
            label='Login'
            disabled={loading}
            onClick={handleSubmit}
            size='full'
            shape='primary'
            type='submit'
          />
        </form>
        {errorMsg && <p className='text-red text-sm font-medium'>{errorMsg}</p>}
      </div>
    </section>
  );
};

export default Login;
