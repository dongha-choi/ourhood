function createFormData(data: Record<string, number | string | File>) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value) {
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value.toString());
      }
    }
  });
  return formData;
}

export default createFormData;
