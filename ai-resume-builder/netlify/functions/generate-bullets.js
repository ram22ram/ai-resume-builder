// netlify/functions/generate-bullets.js
export const handler = async (event) => {
  console.log('🚀 generate-bullets function called!');
  
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    // Parse the request body
    let title = 'Operation Executive';
    let context = 'Skysoft';
    
    if (event.body) {
      const parsedBody = JSON.parse(event.body);
      title = parsedBody.title || title;
      context = parsedBody.context || context;
    }

    console.log(`📝 Generating bullets for: ${title} at ${context}`);

    // Simple mock data
    const bullets = [
      `Managed ${title} operations and improved efficiency by 25%`,
      `Coordinated cross-functional teams to achieve ${title} targets`,
      `Implemented process improvements reducing costs by 15%`,
      `Developed comprehensive ${title} documentation and reports`,
      `Led quality initiatives enhancing ${title} workflow performance`
    ];

    console.log('✅ Returning bullets:', bullets);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ bullets })
    };

  } catch (error) {
    console.error('❌ Error:', error);
    
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
};