
import { MarketAnalysisEngine } from '@/components/market-analysis/market-analysis-engine';

export default function MarketAnalysisPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Market Analysis
        </h1>
        <p className="text-muted-foreground">
          Analyze market trends and crop prices.
        </p>
      </div>
      <MarketAnalysisEngine />
    </div>
  );
}
