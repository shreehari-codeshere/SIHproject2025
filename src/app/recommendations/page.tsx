import { RecommendationEngine } from '@/components/recommendations/recommendation-engine';

export default function RecommendationsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Crop Recommendation Engine
        </h1>
        <p className="text-muted-foreground">
          Fill in the details about your land to get AI-powered crop recommendations.
        </p>
      </div>
      <RecommendationEngine />
    </div>
  );
}
