import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/ui/FormInput';
import Button from '../components/ui/Button';

interface SignUpData {
  email: string;
  password: string;
  confirmationPassword: string;
  nickname: string;
}

const SignUp: React.FC = () => {
  const [signUpData, setSignUpData] = useState<SignUpData>({
    email: '',
    password: '',
    confirmationPassword: '',
    nickname: '',
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const confirmPassword = (a: string, b: string): boolean => {
    return !a || !b || a === b;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    for (const key in signUpData) {
      if (!signUpData[key as keyof SignUpData].trim()) {
        setError(`${key} is empty!`);
        return;
      }
    }
    if (
      !confirmPassword(signUpData.password, signUpData.confirmationPassword)
    ) {
      setError('Check the confirmation password.');
      return;
    }

    try {
      setError('');
      setLoading(true);

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
    <section className='w-full mt-8 flex flex-col items-center text-lg'>
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
            value={signUpData.email}
            label='Enter your email'
            onChange={handleInputChange}
            required
          />
          <FormInput
            type='password'
            name='password'
            value={signUpData.password}
            label='Create a password'
            onChange={handleInputChange}
            required
          />
          <FormInput
            type='password'
            name='confirmationPassword'
            value={signUpData.confirmationPassword}
            label='Confirm the password'
            onChange={handleInputChange}
            required
            error={
              confirmPassword(
                signUpData.password,
                signUpData.confirmationPassword
              )
                ? ''
                : 'Check the password'
            }
          />
          <FormInput
            type='text'
            name='name'
            value={signUpData.nickname}
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

export default SignUp;
