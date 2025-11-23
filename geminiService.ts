import { GoogleGenAI, Type } from "@google/genai";
import { AITemplateResponse } from "./types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateTemplate = async (prompt: string): Promise<AITemplateResponse | null> => {
  if (!apiKey) {
    console.error("API Key not found");
    return null;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Create a structured productivity template based on this request: "${prompt}".
      Return a JSON object with a title, description, structure (array of column names and 2 rows of sample data), and a list of 3 helpful suggestions for using it.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                structure: {
                    type: Type.OBJECT,
                    properties: {
                        columns: { type: Type.ARRAY, items: { type: Type.STRING } },
                        data: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.ARRAY,
                                items: { type: Type.STRING }
                            }
                        }
                    }
                },
                suggestions: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
        }
      },
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as AITemplateResponse;
  } catch (error) {
    console.error("Error generating template:", error);
    return null;
  }
};
