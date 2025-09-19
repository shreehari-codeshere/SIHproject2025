
'use client';

import { useState, useEffect } from 'react';
import type { GetWeatherForecastOutput } from '@/ai/flows/get-weather-forecast';
import { getWeatherForecastAction } from '@/app/actions/weather';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Sun, Cloud, CloudRain, CloudSun, Thermometer, Snowflake, Wind } from 'lucide-react';
import { Separator } from '../ui/separator';

const conditionIcons = {
  Sunny: Sun,
  PartlyCloudy: CloudSun,
  Cloudy: Cloud,
  Rainy: CloudRain,
  Snowy: Snowflake,
  Windy: Wind,
};

export function WeatherCard() {
  const [weather, setWeather] = useState<GetWeatherForecastOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const location = 'Pune'; // Hardcoded for now

  useEffect(() => {
    async function fetchWeather() {
      setIsLoading(true);
      const result = await getWeatherForecastAction(location);
      if (result.error || !result.data) {
        toast({
          variant: 'destructive',
          title: 'Error fetching weather',
          description: result.error || 'Could not load weather data.',
        });
        setWeather(null);
      } else {
        setWeather(result.data);
      }
      setIsLoading(false);
    }
    fetchWeather();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast]);
  
  const CurrentWeatherIcon = weather ? (conditionIcons[mapConditionToIcon(weather.currentWeather.condition)] || Cloud) : null;

  function mapConditionToIcon(conditionText: string) {
    const text = conditionText.toLowerCase();
    if (text.includes('sun') || text.includes('clear')) return 'Sunny';
    if (text.includes('partly cloudy')) return 'PartlyCloudy';
    if (text.includes('cloudy') || text.includes('overcast')) return 'Cloudy';
    if (text.includes('rain') || text.includes('drizzle') || text.includes('patchy rain')) return 'Rainy';
    if (text.includes('snow') || text.includes('sleet') || text.includes('blizzard')) return 'Snowy';
    if (text.includes('wind') || text.includes('gale')) return 'Windy';
    return 'Cloudy';
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Thermometer className="size-5" />
          <span>Weather Forecast</span>
        </CardTitle>
        <CardDescription>
          Real-time weather updates for {location}.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row gap-8">
        {isLoading ? (
          <LoadingSkeleton />
        ) : weather && CurrentWeatherIcon ? (
          <>
            <div className="flex flex-col items-center justify-center text-center p-6 rounded-lg bg-secondary flex-1">
              <CurrentWeatherIcon className="size-16 text-yellow-500 mb-2" />
              <p className="text-5xl font-bold">{Math.round(weather.currentWeather.temperature)}°C</p>
              <p className="text-muted-foreground">{weather.currentWeather.condition}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                <span>Humidity: {weather.currentWeather.humidity}%</span>
                <Separator orientation='vertical' className='h-4' />
                <span>Rainfall: {weather.currentWeather.rainfallChance}%</span>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-around">
              {weather.forecast.map((item) => {
                const ForecastIcon = conditionIcons[item.condition] || Cloud;
                return (
                  <div key={item.day} className="flex flex-col items-center gap-2">
                    <p className="font-medium">{item.day}</p>
                    <ForecastIcon className="size-8 text-muted-foreground" />
                    <p className="font-semibold">{Math.round(item.temp)}°</p>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="h-48 w-full flex items-center justify-center text-muted-foreground">
            Could not load weather data. Please check your API key.
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function LoadingSkeleton() {
  return (
    <div className="w-full flex flex-col sm:flex-row gap-8">
       <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-secondary flex-1 space-y-2">
          <Skeleton className="size-16 rounded-full" />
          <Skeleton className="h-12 w-24" />
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="flex-1 flex items-center justify-around">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                    <Skeleton className="h-5 w-8" />
                    <Skeleton className="size-8 rounded-full" />
                    <Skeleton className="h-5 w-6" />
                </div>
            ))}
        </div>
    </div>
  )
}
