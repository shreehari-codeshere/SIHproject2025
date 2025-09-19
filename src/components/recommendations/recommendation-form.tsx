
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Lightbulb, Send } from 'lucide-react';

type RecommendationFormProps = {
  isSubmitting: boolean;
  onSubmit: (formData: FormData) => void;
};

export function RecommendationForm({ isSubmitting, onSubmit }: RecommendationFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Describe Your Land</CardTitle>
        <CardDescription>
          Provide details about your land for tailored crop recommendations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={onSubmit} className="space-y-6">
          <div>
             <h3 className="text-lg font-medium mb-4">Environmental Conditions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weatherConditions">Weather Conditions</Label>
                <Textarea
                  id="weatherConditions"
                  name="weatherConditions"
                  placeholder="e.g., Temperate, 120 frost-free days"
                  required
                  disabled={isSubmitting}
                  className="h-24"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="waterAvailability">Water Availability</Label>
                <Textarea
                  id="waterAvailability"
                  name="waterAvailability"
                  placeholder="e.g., River irrigation, 500mm annual rainfall"
                  required
                  disabled={isSubmitting}
                   className="h-24"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="temperatureRange">Temperature Range (°C)</Label>
                <Input
                  id="temperatureRange"
                  name="temperatureRange"
                  placeholder="e.g., 15°C - 30°C"
                  required
                  disabled={isSubmitting}
                />
              </div>
               <div className="space-y-2">
                <Label htmlFor="soilType">Soil Type</Label>
                <Input
                  id="soilType"
                  name="soilType"
                  placeholder="e.g., Loamy, Clay, Sandy"
                  required
                  disabled={isSubmitting}
                />
              </div>
               <div className="space-y-2">
                <Label htmlFor="season">Season</Label>
                <Input
                  id="season"
                  name="season"
                  placeholder="e.g., Rainy, Summer, Winter"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center pt-2">
             <div className="text-sm text-muted-foreground flex items-center gap-2">
                <Lightbulb className="size-4" />
                <span>The more detail you provide, the better the recommendations.</span>
             </div>
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Analyzing...' : 'Get Recommendations'}
                <Send className="ml-2 size-4"/>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
