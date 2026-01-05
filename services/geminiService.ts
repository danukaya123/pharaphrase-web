
import { GoogleGenAI } from "@google/genai";
import { ParaphraseTone } from "../types";

export const paraphraseText = async (text: string, tone: ParaphraseTone): Promise<string> => {
  // Check for various ways environment variables are exposed in different build tools
  // @ts-ignore - Support both standard process.env and Vite's import.meta.env
  const apiKey = (typeof process !== 'undefined' ? process.env?.API_KEY : undefined) || 
                 (import.meta as any).env?.VITE_API_KEY;

  if (!apiKey || apiKey === "undefined" || apiKey === "") {
    throw new Error("Quizontal API Key is not configured. On Vercel/Vite, please ensure you have an environment variable named 'VITE_API_KEY'.");
  }

  const ai = new GoogleGenAI({ apiKey: apiKey });
  
  const systemInstruction = `
    You are a world-class professional editor and writing assistant for the brand "Quizontal". 
    Your task is to paraphrase the user's input text to make it unique while strictly following the requested tone: ${tone}.
    
    Guidelines:
    - Maintain the original meaning accurately.
    - Improve clarity, flow, and vocabulary.
    - If the tone is "Concise", reduce word count significantly without losing key points.
    - If the tone is "Creative", use more vivid imagery and diverse sentence structures.
    - If the tone is "Formal", use sophisticated language and avoid contractions.
    - If the tone is "Casual", use a friendly, conversational style.
    - If the tone is "Academic", follow formal scholarly writing conventions.
    - Return ONLY the paraphrased text. No introductory remarks or explanations.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: text,
      config: {
        systemInstruction,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text?.trim() || "Failed to generate paraphrase. Please try again.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (error.message?.includes("API key")) {
      throw new Error("Invalid API Key. Please check your Vercel Environment Variables and ensure VITE_API_KEY is correct.");
    }
    throw new Error("The AI service is temporarily unavailable. Please check your connection.");
  }
};
