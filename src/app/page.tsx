import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { WeatherCard } from '@/components/dashboard/weather-card';
import { QuickActionsCard } from '@/components/dashboard/quick-actions-card';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Welcome to AgriAssist AI
        </h1>
        <p className="text-muted-foreground">
          Your AI-powered agricultural partner.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <QuickActionsCard />
        <WeatherCard />
      </div>
    </div>
  );
}
