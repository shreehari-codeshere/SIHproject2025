
import { config } from 'dotenv';
config();

import '@/ai/flows/crop-recommendation-from-prompt.ts';
import '@/ai/flows/ai-support-for-crop-diagnosis.ts';
import '@/ai/flows/ask-a-question-flow.ts';
import '@/ai/flows/get-weather-forecast.ts';
import '@/ai/tools/get-weather-tool.ts';

