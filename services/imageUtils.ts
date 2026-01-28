import * as ImageManipulator from 'expo-image-manipulator';

export const processImageForGemini = async (uri: string): Promise<string> => {
    try {
        // Resize to max dimension of 1024 to save bandwidth/processing time while keeping legibility suitable for OCR
        const manipResult = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { width: 1024 } }],
            { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG, base64: true }
        );

        return manipResult.base64 || '';
    } catch (error) {
        console.error('Error processing image:', error);
        throw new Error('Failed to process image');
    }
};
