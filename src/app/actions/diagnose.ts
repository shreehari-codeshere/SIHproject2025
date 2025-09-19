
'use server';

import { diagnoseCropIssue } from '@/ai/flows/ai-support-for-crop-diagnosis';
import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const schema = z.object({
  photo: z
    .instanceof(File, { message: 'Image is required.' })
    .refine((file) => file.size > 0, 'Image is required.')
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
  additionalDetails: z.string().optional(),
});

type State = {
  data?: any;
  error?: string;
};

async function fileToDataUri(file: File): Promise<string> {
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    return `data:${file.type};base64,${base64}`;
}


export async function diagnoseCropIssueAction(
  formData: FormData
): Promise<State> {
  const validatedFields = schema.safeParse({
    photo: formData.get('photo'),
    additionalDetails: formData.get('additionalDetails'),
  });

  if (!validatedFields.success) {
    const photoErrors = validatedFields.error.flatten().fieldErrors.photo;
    return {
      error: photoErrors?.[0] || 'Invalid input.',
    };
  }
  
  const { photo, additionalDetails } = validatedFields.data;

  try {
    const photoDataUri = await fileToDataUri(photo);
    
    const result = await diagnoseCropIssue({
      photoDataUri,
      additionalDetails,
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
