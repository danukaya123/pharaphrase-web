import { ParaphraseTone } from "../types";

/**
 * Robustly retrieves the API key from environment variables.
 */
const getSanitizedApiKey = (): string | null => {
  let key: any = null;
  try {
    // @ts-ignore
    key = import.meta.env?.VITE_OPENROUTER_API_KEY;
  } catch (e) {}

  if (!key || key === 'undefined' || key === '') {
    try {
      key = typeof process !== 'undefined' ? process.env?.OPENROUTER_API_KEY : undefined;
    } catch (e) {}
  }

  if (!key || typeof key !== 'string') return null;
  return key.trim().replace(/^["']|["']$/g, '');
};

export const paraphraseText = async (text: string, tone: ParaphraseTone): Promise<string> => {
  const apiKey = getSanitizedApiKey();

  if (!apiKey) {
    throw new Error(
      "OpenRouter API Key is missing. Please add 'VITE_OPENROUTER_API_KEY' to your environment variables."
    );
  }

  const systemInstruction = `
    You are a world-class professional editor and writing assistant for the brand "Quizontal". 
    Your task is to humanize and paraphrase the user's input text.
    
    Tone Goal: ${tone}

    Guidelines:
    - Remove common AI tropes and "corporate speak".
    - Vary sentence structure and length for a natural human flow.
    - Maintain the original meaning accurately.
    - Return ONLY the paraphrased text. No introductory remarks.
  `;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": window.location.origin, // Required by OpenRouter
        "X-Title": "Quizontal Humanizer",       // Required by OpenRouter
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "google/gemini-2.0-flash-exp:free", // You can change this to any OpenRouter model
        "messages": [
          { "role": "system", "content": systemInstruction },
          { "role": "user", "content": text }
        ],
        "temperature": 0.7,
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.error?.message || `API Error: ${response.status}`);
    }

    const data = await response.json();
    const result = data.choices[0]?.message?.content;

    if (!result) {
      throw new Error("The AI returned an empty response.");
    }

    return result.trim();
  } catch (error: any) {
    console.error("OpenRouter API Error:", error);
    throw new Error(error.message || "Quizontal encountered an error. Please try again.");
  }
};
