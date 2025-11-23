import { GoogleGenAI } from "@google/genai";

let genAI: GoogleGenAI | null = null;

const getGenAI = () => {
  if (!genAI) {
    const apiKey = process.env.API_KEY;
    if (apiKey) {
      genAI = new GoogleGenAI({ apiKey });
    } else {
      console.warn("Gemini API Key not found in environment variables.");
    }
  }
  return genAI;
};

export const generatePostContent = async (topic: string): Promise<string> => {
  const ai = getGenAI();
  if (!ai) return "AI Service Unavailable. Please configure API Key.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a short, engaging social media post (under 280 chars) about ${topic} for a blockchain and cryptocurrency audience. Include 2 relevant hashtags. Do not use emojis excessively.`,
      config: {
        temperature: 0.8,
      }
    });
    return response.text || "Could not generate content.";
  } catch (error) {
    console.error("Error generating post:", error);
    return "Error generating content. Please try again.";
  }
};
