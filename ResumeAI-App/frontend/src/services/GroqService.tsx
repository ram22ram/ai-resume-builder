import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const askGroq = async (command: string, currentData: any) => {
  const prompt = `
    Context: You are a resume expert. 
    Task: Update this resume JSON based on user command.
    Current Data: ${JSON.stringify(currentData)}
    Command: ${command}
    Constraint: Return ONLY valid JSON in the same schema. No text.
  `;

  const res = await axios.post(`${API_URL}/ai/chat`, {
    messages: [{ role: "user", content: prompt }]
  });

  return res.data;
};