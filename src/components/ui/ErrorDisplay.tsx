import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className='w-full py-16 flex flex-col items-center justify-center'>
      <div className='p-6 bg-red-50 border border-red-200 rounded-lg max-w-md w-full'>
        <h3 className='text-xl font-semibold text-red-700 mb-2'>
          Error Loading Data
        </h3>
        <p className='text-red-600'>{message}</p>
        <button
          className='mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors'
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorDisplay;
