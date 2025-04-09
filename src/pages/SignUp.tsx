import { AxiosError } from 'axios';
import { LockKeyhole, Mail, Smile } from 'lucide-react';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../components/ui/Button';
import IconFormInput from '../components/ui/IconFormInput';
import useAuth from '../hooks/useAuth';

interface SignupData {
  email: string;
  password: string;
  confirmationPassword: string;
  nickname: string;
}

const Signup: React.FC = () => {
  const { signup } = useAuth();
  const [signupData, setSignupData] = useState<SignupData>({
    email: '',
    password: '',
    confirmationPassword: '',
    nickname: '',
  });
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    for (const key in signupData) {
      if (!signupData[key as keyof SignupData].trim()) {
        setErrorMsg(`${key} is empty!`);
        return;
      }
    }
    if (!isValidEmail(signupData.email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    const { confirmationPassword, ...data } = signupData;
    if (signupData.password !== confirmationPassword) {
      setErrorMsg('Check the confirmation password.');
      return;
    }

    try {
      setErrorMsg('');
      setLoading(true);
      await signup(data);
      navigate('/login');
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorCode = error.response.data.code;
        if (errorCode === 40901) {
          setErrorMsg('This email address has already been registered.');
        } else if (errorCode === 40902) {
          setErrorMsg('This nickname is already in use.');
        }
      } else {
        setErrorMsg('Sign-up failed due to an unknown error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='w-full mt-4 flex flex-col items-center text-lg'>
      <div className='w-80 max-w-100'>
        <div className='my-4 text-center text-2xl font-bold text-brand'>
          Sign Up
        </div>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col items-start gap-5'
          noValidate
        >
          <IconFormInput
            icon={Mail}
            type='email'
            id='signup-email'
            name='email'
            value={signupData.email}
            placeholder='Enter an email'
            label='Email'
            onChange={handleInputChange}
          />
          <div className='w-full flex flex-col gap-2'>
            <IconFormInput
              icon={LockKeyhole}
              type='password'
              id='signup-password'
              name='password'
              value={signupData.password}
              placeholder='Enter a password'
              label='Password'
              onChange={handleInputChange}
            />
            <IconFormInput
              icon={LockKeyhole}
              type='password'
              id='confirmation-password'
              name='confirmationPassword'
              value={signupData.confirmationPassword}
              placeholder='Confirm the password'
              onChange={handleInputChange}
              error={
                signupData.password === signupData.confirmationPassword
                  ? ''
                  : 'Check the password'
              }
            />
          </div>
          <IconFormInput
            icon={Smile}
            type='text'
            id='signup-nickname'
            name='nickname'
            value={signupData.nickname}
            placeholder='Enter a nickname'
            label='Nickname'
            onChange={handleInputChange}
          />
          <Button
            label='Join'
            disabled={loading}
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

export default Signup;
