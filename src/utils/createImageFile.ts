const createImageFile = async (
  thumbnailUrl: string,
  fileName: string
): Promise<File> => {
  try {
    const response = await fetch(thumbnailUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }
    const blob = await response.blob();
    const mimeType = blob.type;
    const extension = mimeType.split('/')[1];
    const imgFile = new File([blob], `${fileName}.${extension}`, {
      type: mimeType,
    });
    return imgFile;
  } catch (error) {
    console.error('Error creating image file:', error);
    throw error;
  }
};

export default createImageFile;
