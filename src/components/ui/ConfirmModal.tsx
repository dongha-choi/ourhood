import React from 'react';
import { X } from 'lucide-react';

// type OnConfirmFunction = (joinRequestId: number) => Promise<void>;

interface ConfirmModalProps {
  title: string;
  message: string;
  confirmText: string;
  handleConfirm: () => void;
  handleCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  message,
  confirmText,
  handleConfirm,
  handleCancel,
}) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='fixed inset-0 bg-black opacity-50'></div>
      <div className='relative bg-white pt-4 pb-3 px-4 text-base font-medium rounded-lg shadow-lg z-10 w-80'>
        <div className='flex justify-center mb-3'>
          <p className='font-semibold'>{title}</p>
          <button className='absolute top-3 right-3' onClick={handleCancel}>
            <X size={16} strokeWidth={2} className='hover:hover-white' />
          </button>
        </div>
        <p className='mb-4 text-sm'>{message}</p>
        <button
          onClick={handleConfirm}
          className='w-full p-1.5 text-sm bg-brand text-white rounded-[0.3rem]'
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
