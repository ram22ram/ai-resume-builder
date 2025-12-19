// src/utils/aiService.ts
// @ts-ignore
const GROQ_API_KEY = (import.meta as any).env?.VITE_GROQ_API_KEY || '';

export const generateContent = async (prompt: string, systemRole: string = "You are a helpful career assistant.") => {
  if (!GROQ_API_KEY) {
    console.error("Missing Groq API Key");
    return "Error: API Key is missing. Please check your settings.";
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemRole },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1024
      })
    });

    if (!response.ok) throw new Error("API Request Failed");

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "No response generated.";
  } catch (error) {
    console.error("AI Generation Error:", error);
    return "Something went wrong. Please check your internet connection.";
  }
};