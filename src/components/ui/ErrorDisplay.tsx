import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className='w-full py-16 flex flex-col items-center justify-center'>
      <div className='p-6 max-w-md w-full'>
        <h3 className='text-xl font-semibold text-red mb-2'>
          Error Loading Data
        </h3>
        <p className='text-red'>{message}</p>
      </div>
    </div>
  );
};

export default ErrorDisplay;
