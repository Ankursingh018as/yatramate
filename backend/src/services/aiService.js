const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);

class AIService {
  async generateDreamTrip(prompt) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      
      const aiPrompt = `
        You are a travel planning expert. Based on this request: "${prompt}"
        
        Generate a detailed travel itinerary in JSON format with this structure:
        {
          "title": "Trip Title",
          "description": "Brief description",
          "duration_days": number,
          "budget_estimate": number,
          "currency": "USD",
          "destinations": [
            {
              "city": "City Name",
              "country": "Country",
              "days": number,
              "highlights": ["activity1", "activity2"],
              "budget_per_day": number
            }
          ],
          "travel_style": "adventure/cultural/relaxation/foodie",
          "best_time_to_visit": "season/months"
        }
        
        Make it realistic and engaging. Return only valid JSON.
      `;

      const result = await model.generateContent(aiPrompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const tripData = JSON.parse(jsonMatch[0]);
        return this.formatTripForDatabase(tripData);
      }
      
      // Fallback if AI response parsing fails
      return this.getFallbackTrip(prompt);
      
    } catch (error) {
      console.error('AI Service Error:', error);
      return this.getFallbackTrip(prompt);
    }
  }

  formatTripForDatabase(aiResponse) {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() + 2); // 2 months from now
    
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + (aiResponse.duration_days || 7));

    return {
      title: aiResponse.title || 'AI-Generated Adventure',
      description: aiResponse.description || 'Your personalized travel experience',
      start_date: startDate,
      end_date: endDate,
      budget_estimate: aiResponse.budget_estimate || 2000,
      currency: aiResponse.currency || 'USD',
      status: 'draft',
      travel_style: aiResponse.travel_style || 'adventure',
      destinations: aiResponse.destinations || [],
      stops: aiResponse.destinations?.map((dest, index) => ({
        city_name: dest.city,
        country: dest.country,
        lat: 0, // Would need geocoding API
        lng: 0,
        arrival_date: new Date(startDate.getTime() + (index * 3 * 24 * 60 * 60 * 1000)),
        departure_date: new Date(startDate.getTime() + ((index + 1) * 3 * 24 * 60 * 60 * 1000)),
        order_index: index + 1,
        highlights: dest.highlights || [],
        budget_per_day: dest.budget_per_day || 100
      })) || []
    };
  }

  getFallbackTrip(prompt) {
    return {
      title: "Personalized Adventure",
      description: `Custom trip based on: "${prompt}"`,
      start_date: new Date('2025-10-01'),
      end_date: new Date('2025-10-15'),
      budget_estimate: 2500,
      currency: 'USD',
      status: 'draft',
      travel_style: 'adventure',
      stops: [
        {
          city_name: 'Bangkok',
          country: 'Thailand',
          lat: 13.7563,
          lng: 100.5018,
          arrival_date: new Date('2025-10-01'),
          departure_date: new Date('2025-10-05'),
          order_index: 1,
          highlights: ['Grand Palace', 'Floating Markets', 'Street Food Tours'],
          budget_per_day: 80
        },
        {
          city_name: 'Siem Reap',
          country: 'Cambodia',
          lat: 13.3671,
          lng: 103.8448,
          arrival_date: new Date('2025-10-05'),
          departure_date: new Date('2025-10-10'),
          order_index: 2,
          highlights: ['Angkor Wat', 'Bayon Temple', 'Local Villages'],
          budget_per_day: 60
        }
      ]
    };
  }

  async suggestActivities(cityName, preferences = {}) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      
      const prompt = `
        Suggest 5-8 activities for ${cityName} based on these preferences: ${JSON.stringify(preferences)}
        
        Return as JSON array:
        [
          {
            "name": "Activity Name",
            "description": "Brief description",
            "duration": "2-3 hours",
            "cost_estimate": 25,
            "category": "cultural/adventure/food/nature",
            "best_time": "morning/afternoon/evening"
          }
        ]
        
        Return only valid JSON array.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      return [];
    } catch (error) {
      console.error('Activity suggestion error:', error);
      return [];
    }
  }
}

module.exports = new AIService();
