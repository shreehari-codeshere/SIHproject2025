'use client';

import { useState } from 'react';
import type { CropRecommendationFromPromptOutput } from '@/ai/flows/crop-recommendation-from-prompt';
import { RecommendationForm } from './recommendation-form';
import { RecommendationResults } from './recommendation-results';
import { getCropRecommendations } from '@/app/actions/recommend';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

export function RecommendationEngine() {
  const [result, setResult] =
    useState<CropRecommendationFromPromptOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setResult(null);

    const response = await getCropRecommendations(formData);
    
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
    <div className="space-y-8">
      <RecommendationForm isSubmitting={isLoading} onSubmit={handleSubmit} />
      {isLoading && <LoadingSkeleton />}
      {result && <RecommendationResults result={result} />}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
       <Skeleton className="h-10 w-1/3" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-[200px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
