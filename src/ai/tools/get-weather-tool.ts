
'use server';

import { ai } from '@/ai/genkit';
import { getCurrentWeather } from '@/services/weather-service';
import { z } from 'genkit';

export const getWeatherTool = ai.defineTool(
    {
        name: 'getWeatherTool',
        description: 'Get the current weather and 5-day forecast for a location.',
        inputSchema: z.object({
            location: z.string().describe('The location to get the weather for.'),
        }),
        outputSchema: z.any(),
    },
    async (input) => {
        return await getCurrentWeather(input.location);
    }
);
