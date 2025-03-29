import { ImageOff } from 'lucide-react';
import React from 'react';

const NoRoomsView: React.FC = () => {
  return (
    <div className='flex-1 pt-48 text-gray flex flex-col gap-3 items-center text-center'>
      <ImageOff color='gray' size={36} strokeWidth={1.5} />
      <div>
        <p>There are no rooms created yet.</p>
        <p>Be the first to create a room!</p>
      </div>
      <button className='py-1 px-3 aurora-hover rounded-md text-white '>
        Create
      </button>
    </div>
  );
};

export default NoRoomsView;
