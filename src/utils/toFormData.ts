import { CreateRoomRequest, EditRoomRequest } from '../features/room/view/api/dto';

// by specifying the type of parameter, it can be more strongly typed
type Payload = CreateRoomRequest | EditRoomRequest;

function toFormData(data: Payload): FormData {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else {
      formData.append(key, value + '');
    }
  });
  return formData;
}

export default toFormData;
