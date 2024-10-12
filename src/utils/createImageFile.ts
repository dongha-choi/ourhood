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
    const imgFile = new File([blob], fileName, {
      type: 'image/jpeg',
    });
    return imgFile;
  } catch (error) {
    console.error('Error creating image file:', error);
    throw error;
  }
};

export default createImageFile;
