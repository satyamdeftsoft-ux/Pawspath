
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateListingDescription(petInfo: { type: string, name: string, needs: string }) {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Write a friendly, professional 3-sentence description for a pet transport listing. 
    Pet: ${petInfo.type} named ${petInfo.name}. 
    Special needs: ${petInfo.needs}. 
    Focus on safety and reliability.`,
    config: {
      temperature: 0.7,
      topP: 0.9,
    },
  });
  return response.text;
}

export async function checkMessageForContactSharing(text: string): Promise<boolean> {
  // A simple mock for AI moderation, in real app would use tool calling or schema
  const prompt = `Determine if the following message contains contact information like phone numbers, emails, or physical addresses to bypass marketplace fees. 
  Message: "${text}"
  Respond with JSON: { "isFlagged": boolean }`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isFlagged: { type: Type.BOOLEAN }
          },
          required: ["isFlagged"]
        }
      }
    });
    const result = JSON.parse(response.text);
    return result.isFlagged;
  } catch (e) {
    return false;
  }
}
