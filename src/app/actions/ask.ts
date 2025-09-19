
'use server';

import { answerQuestion } from '@/ai/flows/ask-a-question-flow';
import { z } from 'zod';

const schema = z.object({
  question: z
    .string({
      required_error: 'Question is required.',
    })
    .min(10, {
      message: 'Please ask a more detailed question (at least 10 characters).',
    }),
});

type State = {
  data?: any;
  error?: string;
};

export async function askQuestionAction(
  formData: FormData
): Promise<State> {
  const validatedFields = schema.safeParse({
    question: formData.get('question'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.question?.[0],
    };
  }

  try {
    const result = await answerQuestion({
      question: validatedFields.data.question,
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
