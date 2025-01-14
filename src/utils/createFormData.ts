// by specifying the type of parameter, it can be more strongly typed

import { MomentPayload } from '../types/apis/moment';
import { RoomPayload } from '../types/apis/room';

type FormDataInput = RoomPayload | MomentPayload;

function createFormData(data: FormDataInput): FormData {
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

export default createFormData;
