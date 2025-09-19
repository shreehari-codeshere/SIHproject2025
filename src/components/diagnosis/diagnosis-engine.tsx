'use client';
import { useState } from 'react';
import type { DiagnoseCropIssueOutput } from '@/ai/flows/ai-support-for-crop-diagnosis';
import { diagnoseCropIssueAction } from '@/app/actions/diagnose';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Upload, Send } from 'lucide-react';
import { DiagnosisResult } from './diagnosis-result';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Skeleton } from '../ui/skeleton';

export function DiagnosisEngine() {
  const [result, setResult] = useState<DiagnoseCropIssueOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const { toast } = useToast();
  
  const placeholderImage = PlaceHolderImages.find(p => p.id === 'diagnosis-placeholder');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    const photo = formData.get('photo');

    if (!photo || !(photo instanceof File) || photo.size === 0) {
        toast({
            variant: 'destructive',
            title: 'No image selected',
            description: 'Please upload an image of the crop.',
        });
        return;
    }

    setIsLoading(true);
    setResult(null);

    const response = await diagnoseCropIssueAction(formData);

    if (response.error || !response.data) {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: response.error || 'An unknown error occurred.',
        });
    } else {
        setResult(response.data);
    }
    setIsLoading(false);
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Submit for Diagnosis</CardTitle>
          <CardDescription>
            Upload a clear photo of the affected crop area.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="aspect-video rounded-lg border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
                {preview ? (
                  <Image src={preview} alt="Crop preview" width={600} height={400} className="object-contain h-full w-full" />
                ) : placeholderImage && (
                  <Image src={placeholderImage.imageUrl} alt="Placeholder" width={600} height={400} className="object-contain h-full w-full opacity-50" data-ai-hint={placeholderImage.imageHint}/>
                )}
              </div>
              <Input id="photo" name="photo" type="file" accept="image/*" onChange={handleFileChange} required disabled={isLoading} />
            </div>

            <Textarea
              name="additionalDetails"
              placeholder="Optional: Add details like crop age, recent weather, or observed symptoms..."
              disabled={isLoading}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Diagnosing...' : 'Get Diagnosis'}
              <Send className="ml-2 size-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <div className='min-h-[400px]'>
        {isLoading && <LoadingSkeleton />}
        {result && preview && <DiagnosisResult result={result} image={preview} />}
        {!isLoading && !result && (
          <div className="flex flex-col items-center justify-center h-full rounded-lg border-2 border-dashed border-border p-8 text-center">
            <Upload className="size-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">Diagnosis will appear here</h3>
            <p className="text-muted-foreground">
              Upload an image and provide details to start the AI diagnosis.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
     <Card>
      <CardHeader>
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-12 w-full" />
        </div>
        <div className="space-y-2">
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-20 w-full" />
        </div>
        <div className="space-y-2">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-4 w-full" />
        </div>
      </CardContent>
    </Card>
  )
}
