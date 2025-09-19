
'use server';

import {
  cropRecommendationFromPrompt,
} from '@/ai/flows/crop-recommendation-from-prompt';
import { z } from 'zod';

const schema = z.object({
  weatherConditions: z.string().min(1, 'Weather conditions are required.'),
  waterAvailability: z.string().min(1, 'Water availability is required.'),
  temperatureRange: z.string().min(1, 'Temperature range is required.'),
  soilType: z.string().min(1, 'Soil type is required.'),
  season: z.string().min(1, 'Season is required.'),
});

type State = {
  data?: any;
  error?: string;
};

export async function getCropRecommendations(
  formData: FormData
): Promise<State> {
  const validatedFields = schema.safeParse({
    weatherConditions: formData.get('weatherConditions'),
    waterAvailability: formData.get('waterAvailability'),
    temperatureRange: formData.get('temperatureRange'),
    soilType: formData.get('soilType'),
    season: formData.get('season'),
  });

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    const firstError = Object.values(errors)[0]?.[0];
    return {
      error: firstError || 'An unexpected validation error occurred.',
    };
  }

  const {
    weatherConditions,
    waterAvailability,
    temperatureRange,
    soilType,
    season,
  } = validatedFields.data;

  const landDescription = `Weather Conditions: ${weatherConditions}. Water Availability: ${waterAvailability}. Temperature Range: ${temperatureRange}. Soil Type: ${soilType}. Season: ${season}.`;

  try {
    const result = await cropRecommendationFromPrompt({
      landDescription,
    });
    return { data: result };
  } catch (error) {
    console.error(error);
    return {
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred.',
    };
  }
}
