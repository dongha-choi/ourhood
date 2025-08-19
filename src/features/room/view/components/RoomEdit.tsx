// import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
// import { IoClose } from 'react-icons/io5';
// import { useNavigate } from 'react-router-dom';

// import { useQueryClient } from '@tanstack/react-query';

// import FormInput from '../../../../components/ui/FormInput';
// import useForm from '../../../../hooks/useForm';
// import useAuthStore from '../../../../stores/useAuthStore';
// import { RoomDetail } from '../../../../types/room';
// import { editRoom } from '../api';
// import { useRoomId, useRoomInfoState } from '../store/useRoomInfoStore';

// const RoomEdit: React.FC = () => {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();

//   const userId = useAuthStore().user.id as number;
//   const roomId = useRoomId();
//   const { roomName, roomDescription, thumbnailUrl } =
//     useRoomInfoState()?.roomDetail ?? {};

//   const {
//     formData: roomDetail,
//     setFormData: setRoomDetail,
//     url,
//     setUrl,
//     handleInputChange,
//     handleBlur,
//   } = useForm<RoomDetail>({
//     newRoomName: '',
//     newRoomDescription: '',
//     newThumbnailUrl: null,
//   });

//   const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, files } = e.target;
//     if (files?.length) {
//       setRoomDetail((prev) => ({
//         ...prev,
//         [name]: files[0],
//       }));
//       setUrl(URL.createObjectURL(files[0]));
//     } else {
//       setUrl(thumbnailUrl as string);
//       setRoomDetail((prev) => ({
//         ...prev,
//         [name]: null,
//       }));
//     }
//   };

//   const handleCancel = () => {
//     navigate(-1);
//   };
//   useEffect(() => {
//     if (roomName && roomDescription) {
//       setRoomDetail((prev) => ({
//         ...prev,
//         newRoomName: roomName,
//         newRoomDescription: roomDescription,
//       }));
//     }
//     if (thumbnailUrl) {
//       setUrl(thumbnailUrl);
//     }
//   }, [roomName, roomDescription, thumbnailUrl, setRoomDetail, setUrl]);

//   const [error, setError] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);
//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     // filter changes
//     const roomPayload: RoomDetail = {
//       // these keys are necessary in edit request
//       newRoomName: roomDetail.newRoomName,
//       newRoomDescription: roomDetail.newRoomDescription,
//     };
//     if (roomDetail.newThumbnailUrl) {
//       roomPayload.newThumbnailUrl = roomDetail.newThumbnailUrl;
//     }

//     try {
//       setError('');
//       setLoading(true);
//       console.log(roomPayload);
//       await editRoom(roomId as number, roomPayload);
//       queryClient.invalidateQueries({ queryKey: ['roomInfo', roomId, userId] });
//       navigate(`/rooms/${roomId}`);
//     } catch (error) {
//       if (error instanceof Error) {
//         setError(`${error.message}`);
//       } else {
//         setError('Room creation failed due to an unknown error');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <section className='w-full mt-4 flex flex-col items-center text-lg'>
//       <div className='w-80 max-w-100'>
//         <div className='my-4 text-center text-2xl font-bold text-brand'>
//           Edit Room
//         </div>
//         <form
//           onSubmit={handleSubmit}
//           className='flex flex-col items-start gap-2'
//         >
//           <FormInput
//             type='text'
//             id='room-name'
//             name='roomName'
//             value={roomDetail.newRoomName}
//             label='Room Name'
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//           />
//           <label
//             htmlFor='room-description'
//             className='w-full mt-2 text-sm font-semibold'
//           >
//             Room Description
//           </label>
//           <textarea
//             id='room-description'
//             name='roomDescription'
//             value={roomDetail.newRoomDescription}
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//             placeholder='Explain about your room...'
//             className='w-full border-light p-1 text-sm min-h-12 appearance-none rounded'
//             rows={3}
//           />
//           <FormInput
//             type='file'
//             id='room-thumbnail'
//             name='thumbnail'
//             label={`Attach an image to ${
//               thumbnailUrl ? 'change' : 'enroll'
//             } thumbnail.`}
//             onChange={handleThumbnailChange}
//           />
//           {url ? (
//             <div className='relative'>
//               <img
//                 src={url}
//                 alt='room-thumbnail'
//                 className='relative w-full h-auto'
//               />
//               {thumbnailUrl && (
//                 <div
//                   className='absolute right-1 top-1'
//                   onClick={() => setUrl('')}
//                 >
//                   <IoClose className='text-red text-lg cursor-pointer hover-white hover:bg-opacity-35 rounded-full' />
//                 </div>
//               )}
//             </div>
//           ) : (
//             thumbnailUrl && (
//               <div className='flex gap-2'>
//                 <p>Thumbnail deleted!</p>
//                 <button
//                   type='button'
//                   className='hover-white border-light'
//                   onClick={() => setUrl(thumbnailUrl)}
//                 >
//                   Restore
//                 </button>
//               </div>
//             )
//           )}
//           <div className='flex gap-2'>
//             <button
//               className='flex-1 px-2 py-1 rounded-lg text-white bg-brand'
//               disabled={loading}
//               onClick={handleSubmit}
//               type='submit'
//             >
//               Save
//             </button>
//             <button type='button' disabled={loading} onClick={handleCancel}>
//               Cancel
//             </button>
//           </div>
//         </form>
//         {error && <p className='text-red text-sm font-medium'>{error}</p>}
//       </div>
//     </section>
//   );
// };

// export default RoomEdit;
