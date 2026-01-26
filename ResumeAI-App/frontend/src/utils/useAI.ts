// useAI.ts - REPLACE ENTIRE FILE
import { useCallback } from 'react';
import axios from 'axios';

// Cache for AI responses
const aiCache = new Map<string, { data: string; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useAI = () => {
  const handleAiAction = useCallback(async (
    actionType: 'roast' | 'improve' | 'suggest',
    sectionType?: string,
    resumeData?: any
  ) => {
    try {
      // Create cache key
      const cacheKey = `${actionType}_${sectionType}_${JSON.stringify(resumeData?.sections?.find((s: any) => s.type === sectionType)?.content || '')}`;
      
      // Check cache
      const cached = aiCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        console.log('Using cached AI response');
        return cached.data;
      }

      let content = '';
      
      if (sectionType && resumeData) {
        const section = resumeData.sections.find((s: any) => s.type === sectionType);
        content = JSON.stringify(section?.content || '');
      } else if (resumeData) {
        content = JSON.stringify(resumeData);
      }

      // Smart prompting based on section type
      let systemPrompt = "You are an expert Resume Writer for FAANG companies.";
      let userPrompt = '';

      switch (actionType) {
        case 'roast':
          userPrompt = `Be a brutal career coach. Roast this resume section in 3 short, funny, but helpful bullet points. Keep it under 50 words: ${content}`;
          break;
        case 'improve':
          // Section-specific improvements
          const sectionSpecificPrompts: Record<string, string> = {
            'summary': `Rewrite this professional summary to be high-impact, concise (2-3 sentences), and include keywords for ATS scanning. Focus on achievements and value proposition. Return ONLY the improved summary: ${content}`,
            'experience': `Improve this job description by using action verbs, quantifying achievements, and making it ATS-friendly. Format as bullet points. Return ONLY the improved description: ${content}`,
            'projects': `Enhance this project description with technical details, challenges overcome, and business impact. Use STAR method (Situation, Task, Action, Result). Return ONLY the improved description: ${content}`,
            'education': `Improve this education section by highlighting relevant coursework, achievements, and GPA if impressive. Return ONLY the improved description: ${content}`,
            'default': `Rewrite this content to be professional, concise, and impactful for a resume. Return ONLY the improved content: ${content}`
          };
          
          userPrompt = sectionSpecificPrompts[sectionType || ''] || sectionSpecificPrompts.default;
          break;
        case 'suggest':
          userPrompt = `Based on this resume data, suggest 3 missing high-demand keywords or skills that would increase the ATS score for ${sectionType || 'this role'}: ${content}`;
          break;
      }

      const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: actionType === 'roast' ? 0.9 : 0.7,
        max_tokens: 500
      }, {
        headers: { 
          Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000 // 30 second timeout
      });

      const aiResponse = response.data.choices[0]?.message?.content || "No response from AI";
      
      // Cache the response
      aiCache.set(cacheKey, {
        data: aiResponse,
        timestamp: Date.now()
      });
      
      return aiResponse;
    } catch (err: any) {
      console.error("AI Error:", err);
      
      // Provide helpful error messages
      if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
        return "AI service timeout. Please try again.";
      }
      
      if (err.response?.status === 401 || err.response?.status === 403) {
        return "AI API key invalid or expired. Please check configuration.";
      }
      
      if (err.response?.status === 429) {
        return "AI rate limit exceeded. Please wait a moment and try again.";
      }
      
      return "AI service temporarily unavailable. Please try again later.";
    }
  }, []);

  // Clear cache function
  const clearCache = useCallback(() => {
    aiCache.clear();
  }, []);

  return { 
    handleAiAction,
    clearCache,
    getCacheSize: () => aiCache.size
  };
};