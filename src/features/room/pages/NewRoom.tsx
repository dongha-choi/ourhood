import React from 'react';

import RoomForm from '../form/components/RoomForm';

const NewRoom: React.FC = () => {
  return (
    <section className='w-full mt-4 flex flex-col items-center text-lg'>
      <div className='w-80 max-w-100'>
        <div className='my-4 text-center text-2xl font-bold text-brand'>
          Create Room
        </div>
        <RoomForm />
      </div>
    </section>
  );
};

export default NewRoom;
