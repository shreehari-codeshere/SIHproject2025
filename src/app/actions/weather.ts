
'use server';

import { getWeatherForecast } from '@/ai/flows/get-weather-forecast';

type State = {
  data?: any;
  error?: string;
};

export async function getWeatherForecastAction(
  location: string
): Promise<State> {
  if (!location) {
    return {
      error: 'Location is required.',
    };
  }

  try {
    const result = await getWeatherForecast({ location });
    return { data: result };
  } catch (error) {
    console.error(error);
    return {
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred.',
    };
  }
}
