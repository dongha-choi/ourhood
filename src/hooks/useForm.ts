import { ChangeEvent, FocusEvent, useState } from 'react';
import { RoomData } from '../types/room';

const useForm = <T extends RoomData>(initialState: T) => {
  const [formData, setFormData] = useState<T>(initialState);
  const [url, setUrl] = useState<string>('');

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files?.length) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
      setUrl(URL.createObjectURL(files[0]));
    } else {
      setUrl('');
      setFormData((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
  };

  return {
    formData,
    setFormData,
    url,
    setUrl,
    handleInputChange,
    handleFileChange,
    handleBlur,
  };
};

export default useForm;
