
'use server';
/**
 * @fileOverview An AI agent that provides a weather forecast.
 *
 * - getWeatherForecast - A function that returns the weather forecast.
 * - GetWeatherForecastInput - The input type for the getWeatherForecast function.
 * - GetWeatherForecastOutput - The return type for the getWeatherForecast function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getWeatherTool } from '../tools/get-weather-tool';

const GetWeatherForecastInputSchema = z.object({
  location: z.string().describe('The location for which to get the weather forecast.'),
});
export type GetWeatherForecastInput = z.infer<typeof GetWeatherForecastInputSchema>;

const DailyForecastSchema = z.object({
  day: z.string().describe('The day of the week (e.g., Mon, Tue).'),
  condition: z.enum(['Sunny', 'Cloudy', 'Rainy', 'PartlyCloudy', 'Snowy', 'Windy']).describe('The weather condition for the day.'),
  temp: z.number().describe('The temperature in Celsius.'),
});

const GetWeatherForecastOutputSchema = z.object({
  currentWeather: z.object({
    temperature: z.number().describe('The current temperature in Celsius.'),
    condition: z.string().describe('A brief description of the current weather condition (e.g., Sunny & Clear).'),
    humidity: z.number().describe('The current humidity percentage.'),
    rainfallChance: z.number().describe('The chance of rain as a percentage.'),
  }),
  forecast: z.array(DailyForecastSchema).length(5).describe('A 5-day weather forecast.'),
});
export type GetWeatherForecastOutput = z.infer<typeof GetWeatherForecastOutputSchema>;

export async function getWeatherForecast(input: GetWeatherForecastInput): Promise<GetWeatherForecastOutput> {
  return getWeatherForecastFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getWeatherForecastPrompt',
  input: {schema: GetWeatherForecastInputSchema},
  output: {schema: GetWeatherForecastOutputSchema},
  tools: [getWeatherTool],
  prompt: `You are a weather forecasting service. Get the current weather and a 5-day forecast for the given location using the provided tool.

Location: {{{location}}}

Then, provide the forecast in the requested JSON format. For the daily forecast condition, choose one of the allowed enum values.`,
});

const getWeatherForecastFlow = ai.defineFlow(
  {
    name: 'getWeatherForecastFlow',
    inputSchema: GetWeatherForecastInputSchema,
    outputSchema: GetWeatherForecastOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
