'use server';

/**
 * @fileOverview A crop recommendation AI agent that takes a prompt and returns crop recommendations.
 *
 * - cropRecommendationFromPrompt - A function that handles the crop recommendation process.
 * - CropRecommendationFromPromptInput - The input type for the cropRecommendationFromPrompt function.
 * - CropRecommendationFromPromptOutput - The return type for the cropRecommendationFromPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CropRecommendationFromPromptInputSchema = z.object({
  landDescription: z
    .string()
    .describe(
      'A description of the land conditions and constraints, including soil type, climate, water availability, and other relevant factors.'
    ),
});
export type CropRecommendationFromPromptInput = z.infer<
  typeof CropRecommendationFromPromptInputSchema
>;

const CropRecommendationFromPromptOutputSchema = z.object({
  recommendations: z
    .array(
      z.object({
        crop: z.string().describe('The name of the recommended crop.'),
        rank: z.number().describe('The rank of the recommendation.'),
        reason: z
          .string()
          .describe('The reason for the recommendation.'),
      })
    )
    .describe('A ranked list of crop recommendations.'),
});
export type CropRecommendationFromPromptOutput = z.infer<
  typeof CropRecommendationFromPromptOutputSchema
>;

export async function cropRecommendationFromPrompt(
  input: CropRecommendationFromPromptInput
): Promise<CropRecommendationFromPromptOutput> {
  return cropRecommendationFromPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cropRecommendationFromPromptPrompt',
  input: {schema: CropRecommendationFromPromptInputSchema},
  output: {schema: CropRecommendationFromPromptOutputSchema},
  prompt: `You are an expert agricultural advisor. Given the following description of land conditions and constraints, provide a ranked list of crop recommendations.

Land Description: {{{landDescription}}}

Respond with a ranked list of crop recommendations, including the crop name, rank, and reason for the recommendation.`,
});

const cropRecommendationFromPromptFlow = ai.defineFlow(
  {
    name: 'cropRecommendationFromPromptFlow',
    inputSchema: CropRecommendationFromPromptInputSchema,
    outputSchema: CropRecommendationFromPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
