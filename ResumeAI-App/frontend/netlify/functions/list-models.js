// netlify/functions/list-models.js - Discover available models
export const handler = async (event) => {
  try {
    if (!process.env.GOOGLE_API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'GOOGLE_API_KEY not set' })
      };
    }

    // List models using the API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${process.env.GOOGLE_API_KEY}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: 'Failed to list models',
          details: errorData 
        })
      };
    }

    const data = await response.json();
    const availableModels = data.models.map(model => ({
      name: model.name,
      displayName: model.displayName,
      supportedMethods: model.supportedGenerationMethods
    }));

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        availableModels,
        total: availableModels.length
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to list models',
        message: error.message
      })
    };
  }
};