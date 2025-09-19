import { DiagnosisEngine } from '@/components/diagnosis/diagnosis-engine';

export default function DiagnosisPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          AI Crop Diagnosis
        </h1>
        <p className="text-muted-foreground">
          Upload an image of an affected crop to get an AI-powered diagnosis and
          treatment suggestions.
        </p>
      </div>
      <DiagnosisEngine />
    </div>
  );
}
