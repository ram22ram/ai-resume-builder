import axios from 'axios';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export const askGroq = async (command: string, currentData: any) => {
  const prompt = `
    Context: You are a resume expert. 
    Task: Update this resume JSON based on user command.
    Current Data: ${JSON.stringify(currentData)}
    Command: ${command}
    Constraint: Return ONLY valid JSON in the same schema. No text.
  `;

  const res = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }]
  }, {
    headers: { Authorization: `Bearer ${GROQ_API_KEY}` }
  });

  return JSON.parse(res.data.choices[0].message.content);
};