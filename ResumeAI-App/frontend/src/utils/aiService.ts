const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const generateContent = async (prompt: string, systemRole: string = "You are a helpful career assistant.") => {
  try {
    const response = await fetch(`${API_URL}/ai/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt,
        systemRole
      })
    });

    if (!response.ok) throw new Error("API Request Failed");

    const data = await response.json();
    return data.content || "No response generated.";
  } catch (error) {
    console.error("AI Generation Error:", error);
    return "Something went wrong. Please check your internet connection.";
  }
};