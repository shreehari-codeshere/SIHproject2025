
export type SoilData = {
  label: string;
  value: number | string;
  unit: string;
};

export type WeatherData = {
  day: string;
  icon: React.ComponentType<{ className?: string }>;
  temp: number;
};

export type WeatherCondition = 'Sunny' | 'Cloudy' | 'Rainy' | 'PartlyCloudy' | 'Snowy' | 'Windy';

