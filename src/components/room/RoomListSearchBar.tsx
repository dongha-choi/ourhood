import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosSearch } from 'react-icons/io';
import { VscLoading } from 'react-icons/vsc';
import { SearchParams } from '../../types/apis/room';

type OrderState = 'date_desc' | 'date_asc' | null;

interface RoomListSearchBarProps {
  searchParams: SearchParams;
  updateSearchParams: (newParams: Partial<SearchParams>) => void;
  isLoading?: boolean;
}

const RoomListSearchBar: React.FC<RoomListSearchBarProps> = ({
  searchParams,
  updateSearchParams,
  isLoading = false,
}) => {
  const navigate = useNavigate();
  const [orderState, setOrderState] = useState<OrderState>(
    searchParams.order as OrderState
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      updateSearchParams({ [name]: value });
    },
    [updateSearchParams]
  );

  const handleOrderSelectButton = useCallback(
    (clickedState: OrderState) => {
      const newState = clickedState === orderState ? null : clickedState;
      setOrderState(newState);
      updateSearchParams({ order: newState });
    },
    [orderState, updateSearchParams]
  );

  const ORDER_OPTIONS = [
    { value: 'date_desc', label: 'Latest' },
    { value: 'date_asc', label: 'Oldest' },
  ];

  return (
    <div className='mb-3 flex flex-col gap-2 text-sm'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-1 gap-2'>
          <select
            name='condition'
            value={searchParams.condition}
            onChange={handleInputChange}
            className={`rounded border border-lightGray p-1 text-sm ${
              isLoading ? 'cursor-not-allowed opacity-80' : ''
            }`}
            aria-label='Search condition'
            disabled={isLoading}
          >
            <option value='room'>Room</option>
            <option value='host'>Host</option>
          </select>

          <div className='relative flex w-1/4 min-w-40 items-center'>
            <input
              type='text'
              name='q'
              value={searchParams.q}
              onChange={handleInputChange}
              placeholder='Search...'
              className={`w-full border-b px-1 font-normal outline-none ${
                isLoading ? 'cursor-not-allowed opacity-80' : ''
              }`}
              aria-label='Search query'
            />
            <button
              type='button'
              aria-label='Search'
              className='ml-1'
              disabled={isLoading}
            >
              {isLoading ? (
                <VscLoading className='animate-spin text-xl text-brand' />
              ) : (
                <IoIosSearch className='text-xl font-bold' />
              )}
            </button>
          </div>
        </div>

        <button
          className='py-1 px-2.5 aurora-hover rounded-md text-base text-white '
          onClick={() => navigate('/rooms/new')}
        >
          Create Room
        </button>
      </div>

      <div className='flex gap-2 text-xs'>
        {ORDER_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            type='button'
            className={`rounded-md px-2.5 py-1.5 transition-colors duration-300 ${
              orderState === value
                ? 'bg-brand text-white'
                : 'bg-lightWhite hover:bg-midWhite'
            } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            onClick={() => handleOrderSelectButton(value as OrderState)}
            disabled={isLoading}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoomListSearchBar;
