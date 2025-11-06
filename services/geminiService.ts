import { GoogleGenAI, Type } from '@google/genai';
import type { Mission, ChatMessage } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const missionSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: 'A cool, punchy title for the mission. e.g., "Operation Nightfall".'
    },
    objective: {
      type: Type.STRING,
      description: 'A clear, concise objective for the mission. e.g., "Infiltrate the CyCorp tower and extract the data core."'
    },
    location: {
      type: Type.STRING,
      description: 'The name of the location where the mission takes place. e.g., "Sector 7, Neo-Kyoto".'
    },
    reward: {
      type: Type.INTEGER,
      description: 'The in-game currency reward for completing the mission. e.g., 15000.'
    }
  },
  required: ['title', 'objective', 'location', 'reward']
};

export async function generateMission(): Promise<Mission> {
  const prompt = `You are 'Nexus Command', an AI mission coordinator for an elite special forces unit in a futuristic, dystopian world.
  Generate a single, thrilling mission briefing for a solo operative codenamed 'Spectre'.
  The tone should be urgent, professional, and exciting.
  The setting is a high-tech, cyberpunk city.
  Create a unique mission title, objective, location, and a numerical reward value.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: missionSchema,
      temperature: 0.9,
    },
  });

  const jsonText = response.text.trim();
  try {
    const missionData = JSON.parse(jsonText);
    return missionData as Mission;
  } catch (error) {
    console.error("Failed to parse Gemini response:", jsonText);
    throw new Error("Received invalid mission data from AI.");
  }
}


export async function generateChatResponse(username: string, message: string, history: ChatMessage[]): Promise<string> {
  const formattedHistory = history
    .slice(-6) // Get last 6 messages for context
    .map(msg => `${msg.sender}: ${msg.text}`)
    .join('\n');

  const prompt = `You are 'Ghost', an elite operative in a futuristic game lobby, talking to another player named '${username}'.
Your personality is cool, concise, and a bit mysterious. You are a friendly rival.
Keep your responses short and punchy, like a real chat message.

Chat History:
${formattedHistory}

${username}: ${message}
Ghost:`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.8,
        maxOutputTokens: 50,
      },
    });

    return response.text.trim();
  } catch (error) {
    console.error("Failed to get chat response from Gemini:", error);
    return "Connection to comms lost...";
  }
}