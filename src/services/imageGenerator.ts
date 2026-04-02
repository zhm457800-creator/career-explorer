import { GoogleGenAI } from "@google/genai";

export const generateBloomImage = async () => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: 'A lush, flourishing tree with dense, vibrant green foliage, reaching its peak growth. The tree is set within a minimalist, brutalist architectural space with clean lines and moody, dramatic lighting. High contrast, deep shadows, cinematic atmosphere. The image should feel sophisticated, professional, and represent "The Bloom" stage of a narrative. 16:9 aspect ratio.',
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "16:9",
      },
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};
