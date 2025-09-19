'use server';
/**
 * @fileOverview An AI agent that diagnoses crop diseases and pest infestations from images.
 *
 * - diagnoseCropIssue - A function that handles the crop issue diagnosis process.
 * - DiagnoseCropIssueInput - The input type for the diagnoseCropIssue function.
 * - DiagnoseCropIssueOutput - The return type for the diagnoseCropIssue function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DiagnoseCropIssueInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the crop, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  additionalDetails: z.string().optional().describe('Any additional details about the crop or issue.'),
});
export type DiagnoseCropIssueInput = z.infer<typeof DiagnoseCropIssueInputSchema>;

const DiagnoseCropIssueOutputSchema = z.object({
  diagnosis: z.string().describe('The diagnosis of the crop issue, including potential diseases or pests.'),
  suggestedTreatments: z.string().describe('Suggested treatments for the diagnosed issue.'),
  confidenceLevel: z.number().describe('A confidence level (0-1) for the diagnosis.'),
});
export type DiagnoseCropIssueOutput = z.infer<typeof DiagnoseCropIssueOutputSchema>;

export async function diagnoseCropIssue(input: DiagnoseCropIssueInput): Promise<DiagnoseCropIssueOutput> {
  return diagnoseCropIssueFlow(input);
}

const prompt = ai.definePrompt({
  name: 'diagnoseCropIssuePrompt',
  input: {schema: DiagnoseCropIssueInputSchema},
  output: {schema: DiagnoseCropIssueOutputSchema},
  prompt: `You are an expert agricultural advisor. A farmer has provided an image of their crop and is seeking a diagnosis of potential issues such as diseases or pest infestations. Provide a diagnosis and suggest appropriate treatments.
  \n  Here are the details provided by the farmer:
  \n  {{#if additionalDetails}}
  Additional Details: {{{additionalDetails}}}
  {{/if}}
  \n  Crop Image: {{media url=photoDataUri}}
  \n  Based on the image and any additional details, provide a diagnosis of potential diseases or pest infestations, suggest appropriate treatments, and provide a confidence level (0-1) for your diagnosis.
  \n  Format your response as follows:
  Diagnosis: <diagnosis>
  Suggested Treatments: <suggested treatments>
  Confidence Level: <confidence level>\n`,
});

const diagnoseCropIssueFlow = ai.defineFlow(
  {
    name: 'diagnoseCropIssueFlow',
    inputSchema: DiagnoseCropIssueInputSchema,
    outputSchema: DiagnoseCropIssueOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
