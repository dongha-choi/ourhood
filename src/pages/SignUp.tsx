import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/ui/FormInput';
import Button from '../components/ui/Button';
import { SignupData } from '../types/auth';
import { useAuth } from '../hooks/authHooks';

const Signup: React.FC = () => {
  const { signup } = useAuth();
  const [signupData, setSignupData] = useState<SignupData>({
    email: '',
    password: '',
    confirmationPassword: '',
    nickname: '',
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

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
        setError(`${key} is empty!`);
        return;
      }
    }
    if (signupData.password !== signupData.confirmationPassword) {
      setError('Check the confirmation password.');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await signup(signupData);
      alert('Signup request sent!');

      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
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
          className='flex flex-col items-start gap-4'
        >
          <FormInput
            type='email'
            name='email'
            value={signupData.email}
            label='Enter your email'
            onChange={handleInputChange}
            required
          />
          <FormInput
            type='password'
            name='password'
            value={signupData.password}
            label='Create a password'
            onChange={handleInputChange}
            required
          />
          <FormInput
            type='password'
            name='confirmationPassword'
            value={signupData.confirmationPassword}
            label='Confirm the password'
            onChange={handleInputChange}
            required
            error={
              signupData.password === signupData.confirmationPassword
                ? ''
                : 'Check the password'
            }
          />
          <FormInput
            type='text'
            name='nickname'
            value={signupData.nickname}
            label='Make your own nickname'
            onChange={handleInputChange}
            required
          />
        </form>
        {error && <p className='text-red text-sm font-medium'>{error}</p>}
        <Button
          label='Join'
          loading={loading}
          onClick={handleSubmit}
          type='submit'
        />
      </div>
    </section>
  );
};

export default Signup;
