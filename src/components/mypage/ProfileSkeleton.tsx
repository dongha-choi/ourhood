import React from 'react';

const ProfileSkeleton: React.FC = () => {
  return (
    <section className='w-full py-8 flex flex-col md:flex-row gap-8 px-4 md:px-8 animate-pulse'>
      {/* Profile sidebar skeleton */}
      <aside className='w-full md:w-72 self-start p-6 flex flex-col rounded-lg shadow-md bg-white'>
        <div className='flex flex-col items-center'>
          {/* Profile image skeleton */}
          <div className='w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-200'></div>

          {/* Name and email skeleton */}
          <div className='mt-4 py-2 w-full'>
            <div className='h-8 bg-gray-200 rounded-md w-3/4 mx-auto'></div>
            <div className='h-4 bg-gray-200 rounded-md w-1/2 mx-auto mt-2'></div>
          </div>
        </div>

        {/* Invitations skeleton */}
        <div className='mt-6 py-4 border-t border-gray-200'>
          <div className='h-6 bg-gray-200 rounded-md w-1/2 mb-3'></div>
          <div className='mt-1 flex flex-col gap-3'>
            {[1, 2].map((i) => (
              <div key={i} className='p-3 bg-gray-100 rounded-lg'>
                <div className='h-5 bg-gray-200 rounded-md w-3/4 mb-2'></div>
                <div className='h-4 bg-gray-200 rounded-md w-1/2 mb-2'></div>
                <div className='h-3 bg-gray-200 rounded-md w-1/3 mb-3'></div>
                <div className='flex gap-2'>
                  <div className='h-8 bg-gray-200 rounded-md flex-1'></div>
                  <div className='h-8 bg-gray-200 rounded-md flex-1'></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Rooms skeleton */}
      <div className='flex-1'>
        <div className='h-8 bg-gray-200 rounded-md w-40 mb-6'></div>
        <div className='w-full gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className='p-4 bg-gray-100 rounded-lg h-64'>
              <div className='h-32 bg-gray-200 rounded-md mb-3'></div>
              <div className='h-6 bg-gray-200 rounded-md w-3/4 mb-2'></div>
              <div className='h-4 bg-gray-200 rounded-md w-1/2 mb-2'></div>
              <div className='h-4 bg-gray-200 rounded-md w-1/4'></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfileSkeleton;
