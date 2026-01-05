import { ParaphraseTone } from "../types";

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

// List of free models to try in order of quality
const FREE_MODELS = [
  "google/gemini-2.0-flash-exp:free",
  "meta-llama/llama-3.3-70b-instruct:free",
  "mistralai/mistral-7b-instruct:free",
  "google/gemini-pro-1.5:free"
];

export const paraphraseText = async (text: string, tone: ParaphraseTone, modelIndex = 0): Promise<string> => {
  const apiKey = getSanitizedApiKey();

  if (!apiKey) {
    throw new Error("OpenRouter API Key is missing in your environment variables.");
  }

  const systemInstruction = `
    You are an expert editor for "Quizontal". 
    Rewrite this text to sound like a human. 
    Tone: ${tone}. 
    Return ONLY the rewritten text.
  `;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": window.location.origin,
        "X-Title": "Quizontal Humanizer",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": FREE_MODELS[modelIndex],
        "messages": [
          { "role": "system", "content": systemInstruction },
          { "role": "user", "content": text }
        ],
        "temperature": 0.8,
      })
    });

    // If 429 (Too Many Requests) and we have more models to try
    if (response.status === 429 && modelIndex < FREE_MODELS.length - 1) {
      console.warn(`Model ${FREE_MODELS[modelIndex]} busy. Trying fallback: ${FREE_MODELS[modelIndex + 1]}`);
      return paraphraseText(text, tone, modelIndex + 1);
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData?.error?.message || `Error ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content.trim();

  } catch (error: any) {
    // Final fallback if the fetch itself fails
    if (modelIndex < FREE_MODELS.length - 1) {
        return paraphraseText(text, tone, modelIndex + 1);
    }
    throw new Error("All free models are currently busy. Please wait 10 seconds and try again.");
  }
};
