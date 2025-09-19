import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Sprout,
  LineChart,
  HelpCircle,
} from 'lucide-react';

export function QuickActionsCard() {
  const actions = [
    {
      href: '/recommendations',
      title: 'Get Crop Recommendations',
      description: 'Find the best crops for your land.',
      icon: Sprout,
    },
    {
      href: '/market-analysis',
      title: 'Analyze Market Trends',
      description: 'View crop prices and market data.',
      icon: LineChart,
    },
    {
      href: '/ask-a-question',
      title: 'Ask an AI Expert',
      description: 'Get answers to your farming questions.',
      icon: HelpCircle,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Access key features of AgriAssist AI.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {actions.map((action) => (
          <Link href={action.href} key={action.href}>
            <Button
              variant="outline"
              className="w-full h-auto justify-start p-4 text-left"
            >
              <action.icon className="size-6 mr-4 shrink-0 text-primary" />
              <div className="flex-1">
                <p className="font-semibold">{action.title}</p>
                <p className="text-sm text-muted-foreground">
                  {action.description}
                </p>
              </div>
              <ArrowRight className="size-4 ml-4" />
            </Button>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
