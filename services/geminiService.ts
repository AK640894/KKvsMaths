
import { GoogleGenAI } from "@google/genai";

export async function generateStickerImage(subject: string): Promise<string | null> {
  try {
    if (!process.env.API_KEY) {
      console.error("API_KEY environment variable not set.");
      return null;
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `A cute, simple, cartoon sticker for a kindergarten child. A ${subject} with a happy face. The sticker should have a thick black outline and bright, solid colors. The background must be transparent.`;
    
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/png',
        aspectRatio: '1:1',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      return response.generatedImages[0].image.imageBytes;
    }
    return null;
  } catch (error) {
    console.error("Error generating sticker with Gemini:", error);
    return null;
  }
}
