// netlify/functions/generate.js - Using correct model names from your available list
export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: 'Method Not Allowed' }) 
    };
  }

  try {
    const { section, promptText } = JSON.parse(event.body);
    
    if (!section || !promptText) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Section and promptText are required' })
      };
    }

    if (!process.env.GOOGLE_API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'API configuration error' })
      };
    }

    // Use the exact model names from your available list
    const model = 'gemini-2.0-flash'; // This should work based on your available models
    
    console.log(`Using model: ${model}`);
    
    const API_URL = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${process.env.GOOGLE_API_KEY}`;
    
    const prompt = section === 'summary' 
      ? `Create a professional 2-3 line resume summary for a ${promptText}. Focus on key strengths, technical skills, and career achievements. Use professional tone and action-oriented language. Return only the summary text without any explanations.`
      : `Enhance this resume ${section} to be more professional and impactful: "${promptText}". Focus on quantifiable achievements, action verbs, and professional language. Keep it concise. Return only the enhanced text without any explanations.`;

    console.log('Sending request to:', API_URL);
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ 
          parts: [{ 
            text: prompt 
          }] 
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error details:', errorData);
      throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response received successfully');
    
    // Extract the generated text safely
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
      console.error('Invalid response structure:', data);
      throw new Error('Invalid response format from AI API');
    }

    const generatedText = data.candidates[0].content.parts[0].text;
    
    if (!generatedText || generatedText.trim() === '') {
      throw new Error('Received empty response from AI service');
    }

    console.log('AI generation successful - Response length:', generatedText.length);

    return {
      statusCode: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ 
        content: generatedText.trim(),
        section: section,
        modelUsed: model
      })
    };

  } catch (error) {
    console.error('Error in generate function:', error);
    
    return {
      statusCode: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ 
        error: 'Failed to generate content',
        message: error.message,
        details: 'Please check your API key and try again'
      })
    };
  }
};