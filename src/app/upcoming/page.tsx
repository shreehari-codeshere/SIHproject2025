import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Stethoscope, Droplets, Leaf } from 'lucide-react';

const upcomingFeatures = [
  {
    title: 'Disease Analysis',
    description: 'Advanced AI-powered disease detection from images, with more detailed analysis and historical tracking.',
    icon: Stethoscope,
  },
  {
    title: 'Irrigation Advice',
    description: 'Smart irrigation scheduling based on weather forecasts, soil moisture data, and crop type.',
    icon: Droplets,
  },
  {
    title: 'Fertilizer Advice',
    description: 'Personalized fertilizer recommendations to optimize nutrient levels and improve crop yield.',
    icon: Leaf,
  },
];

export default function UpcomingPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Upcoming Features
        </h1>
        <p className="text-muted-foreground">
          Stay tuned for new tools and features to help you on the farm.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingFeatures.map((feature) => (
          <Card key={feature.title}>
            <CardHeader className="flex flex-row items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <feature.icon className="size-6 text-primary" />
              </div>
              <div className="flex-1">
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription className="mt-2">{feature.description}</CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
