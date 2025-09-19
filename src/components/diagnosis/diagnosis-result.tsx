import type { DiagnoseCropIssueOutput } from '@/ai/flows/ai-support-for-crop-diagnosis';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '../ui/badge';
import { Lightbulb, ShieldCheck, Stethoscope } from 'lucide-react';

type DiagnosisResultProps = {
  result: DiagnoseCropIssueOutput;
  image: string;
};

export function DiagnosisResult({ result }: DiagnosisResultProps) {
  const confidencePercent = Math.round(result.confidenceLevel * 100);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Diagnosis Result</CardTitle>
        <CardDescription>
          Based on the provided image and details.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="font-semibold flex items-center gap-2"><Stethoscope className="size-4 text-primary" />Diagnosis</h3>
          <div className="p-3 rounded-md bg-secondary text-secondary-foreground">
            {result.diagnosis}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold flex items-center gap-2"><Lightbulb className="size-4 text-primary" />Suggested Treatments</h3>
          <div className="p-3 rounded-md bg-secondary text-secondary-foreground">
            {result.suggestedTreatments}
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold flex items-center gap-2"><ShieldCheck className="size-4 text-primary" />Confidence Level</h3>
          <div className="flex items-center gap-4">
            <Progress value={confidencePercent} className="w-full" />
            <Badge variant="secondary" className="text-base font-bold w-20 justify-center">
              {confidencePercent}%
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
