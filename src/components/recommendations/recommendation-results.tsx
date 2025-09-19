'use client';

import { useState, useEffect } from 'react';
import type { CropRecommendationFromPromptOutput } from '@/ai/flows/crop-recommendation-from-prompt';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Droplets, DollarSign, Tractor } from 'lucide-react';

type RecommendationResultsProps = {
  result: CropRecommendationFromPromptOutput;
};

const chartConfig = {
  yield: {
    label: 'Yield (kg/acre)',
    color: 'hsl(var(--chart-1))',
  },
  profit: {
    label: 'Profit ($/acre)',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function RecommendationResults({ result }: RecommendationResultsProps) {
  const topRecommendations = result.recommendations.slice(0, 3);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // Generate chart data on the client side to avoid hydration errors.
    const generateChartData = () => [
        { metric: 'Low', yield: 1500 + Math.random() * 500, profit: 300 + Math.random() * 100 },
        { metric: 'Avg', yield: 2500 + Math.random() * 1000, profit: 500 + Math.random() * 200 },
        { metric: 'High', yield: 4000 + Math.random() * 1500, profit: 800 + Math.random() * 300 },
      ];
    setChartData(generateChartData());
  }, []);


  return (
    <div>
       <h2 className="text-2xl font-bold tracking-tight font-headline mb-4">
        Top Recommendations
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {topRecommendations.map((rec) => {
          const placeholder = PlaceHolderImages.find(p => p.id === rec.crop.toLowerCase()) || PlaceHolderImages[0];
          return (
          <Card key={rec.rank} className="flex flex-col">
            <CardHeader>
              <div className="relative h-48 w-full mb-4">
                <Image
                  src={placeholder.imageUrl}
                  alt={rec.crop}
                  fill
                  className="rounded-lg object-cover"
                  data-ai-hint={placeholder.imageHint}
                />
                <Badge className="absolute top-2 right-2">Rank #{rec.rank}</Badge>
              </div>
              <CardTitle>{rec.crop}</CardTitle>
              <CardDescription>{rec.reason}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-end space-y-4">
               <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Resource Profile</h4>
                  <div className="flex justify-around text-xs text-muted-foreground">
                    <div className="flex items-center gap-1"><Droplets className="size-3"/> High Water</div>
                    <div className="flex items-center gap-1"><DollarSign className="size-3"/> Med. Fertilizer</div>
                    <div className="flex items-center gap-1"><Tractor className="size-3"/> Med. Labor</div>
                  </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">Yield & Profit Forecast</h4>
                {chartData.length > 0 ? (
                <ChartContainer config={chartConfig} className="h-40 w-full">
                  <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="metric"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                     <YAxis hide={true} />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="dot" />}
                    />
                    <Bar dataKey="yield" fill="var(--color-yield)" radius={4} />
                    <Bar dataKey="profit" fill="var(--color-profit)" radius={4} />
                  </BarChart>
                </ChartContainer>
                ) : (
                  <div className="h-40 w-full flex items-center justify-center text-muted-foreground">Loading chart...</div>
                )}
              </div>
            </CardContent>
          </Card>
        )})}
      </div>
    </div>
  );
}
