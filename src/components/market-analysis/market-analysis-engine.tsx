
'use client';
import { useState, useEffect } from 'react';
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
import { LineChart, CartesianGrid, XAxis, YAxis, Line } from 'recharts';
import { Wheat } from 'lucide-react';

const chartConfig = {
  price: {
    label: 'Price (USD)',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function MarketAnalysisEngine() {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const generateChartData = () => {
        const data = [];
        const today = new Date();
        for(let i = 30; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            data.push({
                date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                price: 180 + Math.random() * 40 - (i/2),
            });
        }
        return data;
    }
    setChartData(generateChartData());
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Wheat className="size-5" />
            <span>Wheat Price Trend</span>
        </CardTitle>
        <CardDescription>
          Last 30 days price trend for Wheat.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
        <ChartContainer config={chartConfig} className="h-96 w-full">
          <LineChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              domain={['dataMin - 10', 'dataMax + 10']}
              tickFormatter={(value) => `$${value}`}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Line
              dataKey="price"
              type="monotone"
              stroke="var(--color-price)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
        ) : (
            <div className="h-96 w-full flex items-center justify-center text-muted-foreground">Loading chart...</div>
        )}
      </CardContent>
    </Card>
  );
}
