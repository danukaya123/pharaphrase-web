
import { GoogleGenAI } from "@google/genai";
import { ParaphraseTone } from "../types";

/**
 * Robustly retrieves the API key from environment variables.
 * Handles both Vite (import.meta.env) and standard (process.env) formats.
 * Aggressively cleans the string to prevent common deployment errors.
 */
const getSanitizedApiKey = (): string | null => {
  let key: any = null;

  // 1. Try Vite format (Standard for Vercel + Vite builds)
  try {
    // @ts-ignore - Accessing Vite env
    key = import.meta.env?.VITE_API_KEY;
  } catch (e) {}

  // 2. Try standard process.env format
  if (!key || key === 'undefined' || key === '') {
    try {
      key = typeof process !== 'undefined' ? process.env?.API_KEY : undefined;
    } catch (e) {}
  }

  if (!key || typeof key !== 'string') return null;

  // 3. Clean the key: remove whitespace and potential surrounding quotes ("" or '')
  // Users often accidentally paste quotes into the Vercel UI.
  const cleanedKey = key.trim().replace(/^["']|["']$/g, '');
  
  return cleanedKey || null;
};

export const paraphraseText = async (text: string, tone: ParaphraseTone): Promise<string> => {
  const apiKey = getSanitizedApiKey();

  if (!apiKey) {
    throw new Error(
      "Quizontal API Key is missing. Please ensure you have added 'VITE_API_KEY' to your Vercel Environment Variables and REDEPLOYED your app."
    );
  }

  // Initialize a fresh instance to ensure the most current key is used
  const ai = new GoogleGenAI({ apiKey });
  
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

    if (!response || !response.text) {
      throw new Error("The AI returned an empty response. Please try with different text.");
    }

    return response.text.trim();
  } catch (error: any) {
    console.error("Gemini API Error details:", error);
    
    // Specifically handle the 400 API_KEY_INVALID error
    const errorMsg = error.message || "";
    if (errorMsg.includes("API key not valid") || errorMsg.includes("INVALID_ARGUMENT") || errorMsg.includes("400")) {
      throw new Error("The API key is invalid. Ensure you copied the full key from Google AI Studio and removed any quotes or spaces in your Vercel settings.");
    }
    
    if (errorMsg.includes("model not found") || errorMsg.includes("404")) {
      throw new Error("Model 'gemini-3-flash-preview' is not available for your API key yet. Please check your AI Studio access.");
    }

    throw new Error(error.message || "Quizontal encountered an error while paraphrasing. Please try again.");
  }
};
