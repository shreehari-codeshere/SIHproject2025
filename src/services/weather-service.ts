
import type { GetWeatherForecastOutput } from '@/ai/flows/get-weather-forecast';
import fetch from 'node-fetch';

const API_KEY = process.env.WEATHER_API_KEY;

function mapCondition(conditionText: string): 'Sunny' | 'Cloudy' | 'Rainy' | 'PartlyCloudy' | 'Snowy' | 'Windy' {
    const text = conditionText.toLowerCase();
    if (text.includes('sun') || text.includes('clear')) return 'Sunny';
    if (text.includes('cloudy') || text.includes('overcast')) return 'Cloudy';
    if (text.includes('rain') || text.includes('drizzle')) return 'Rainy';
    if (text.includes('partly cloudy')) return 'PartlyCloudy';
    if (text.includes('snow') || text.includes('sleet') || text.includes('blizzard')) return 'Snowy';
    if (text.includes('wind') || text.includes('gale')) return 'Windy';
    return 'Cloudy'; // Default
}

export async function getCurrentWeather(location: string): Promise<GetWeatherForecastOutput> {
    if (!API_KEY) {
        throw new Error('Weather API key is not configured.');
    }

    const url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=5&aqi=no&alerts=no`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Weather API error: ${errorData.error.message}`);
        }
        const data: any = await response.json();

        return {
            currentWeather: {
                temperature: data.current.temp_c,
                condition: data.current.condition.text,
                humidity: data.current.humidity,
                rainfallChance: data.forecast.forecastday[0].day.daily_chance_of_rain,
            },
            forecast: data.forecast.forecastday.slice(0, 5).map((day: any) => ({
                day: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
                condition: mapCondition(day.day.condition.text),
                temp: day.day.avgtemp_c,
            })),
        };
    } catch (error) {
        console.error('Failed to fetch weather data:', error);
        throw new Error('Could not retrieve weather information.');
    }
}
