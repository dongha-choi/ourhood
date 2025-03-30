import { ImageOff } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface NoRoomsViewParams {
  hasSearchQuery: boolean;
}

const NoRoomsView: React.FC<NoRoomsViewParams> = ({ hasSearchQuery }) => {
  const navigate = useNavigate();
  return (
    <div className='flex-1 pt-48 text-gray flex flex-col gap-3 items-center text-center'>
      <ImageOff color='gray' size={36} strokeWidth={1.5} />
      {hasSearchQuery && (
        <div>
          <p>No rooms found.</p>
        </div>
      )}
      {!hasSearchQuery && (
        <div>
          <p>There are no rooms created yet.</p>
          <p>Be the first to create a room!</p>
        </div>
      )}
      {!hasSearchQuery && (
        <button
          className='py-1 px-3 aurora-hover rounded-md text-white '
          onClick={() => navigate('/rooms/new')}
        >
          Create
        </button>
      )}
    </div>
  );
};

export default NoRoomsView;
