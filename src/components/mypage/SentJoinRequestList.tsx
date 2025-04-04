import React from 'react';

import { SentJoinRequest } from '../../types/memberRequest';
import SentJoinRequestItem from '../member-request/SentJoinRequestItem';

interface SentJoinRequestListProps {
  sentJoinRequests: SentJoinRequest[];
}

const SentJoinRequestList: React.FC<SentJoinRequestListProps> = ({
  sentJoinRequests,
}) => {
  return (
    <div>
      <p className='w-full text-xl font-semibold'>Join Requests</p>
      {sentJoinRequests.length > 0 ? (
        <ul className='mt-1 flex flex-col gap-3'>
          {sentJoinRequests.map((joinRequest) => (
            <SentJoinRequestItem
              key={joinRequest.joinRequestId}
              joinRequest={joinRequest}
            />
          ))}
        </ul>
      ) : (
        <div className=' text-midGray text-sm font-light'>
          You haven't sent any requests.
        </div>
      )}
    </div>
  );
};

export default SentJoinRequestList;
