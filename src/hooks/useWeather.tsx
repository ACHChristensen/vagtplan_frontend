import { useEffect, useState } from "react";

type DailyWeather = {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max?: number[];
};

type WeatherResponse = {
  daily: DailyWeather;
};

interface UseWeatherOptions {
  lat: number;
  lon: number;
  days?: number;
}

export const useWeather = ({ lat, lon, days = 7 }: UseWeatherOptions) => {
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const url =
          `https://api.open-meteo.com/v1/forecast` +
          `?latitude=${lat}` +
          `&longitude=${lon}` +
          `&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
          `&forecast_days=${days}` +
          `&timezone=Europe%2FCopenhagen`;

        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error("Failed to fetch weather");

        const json = (await res.json()) as WeatherResponse;
        setData(json);
      } catch (err: any) {
        if (err.name === "AbortError") return;
        setError(err?.message ?? "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    return () => controller.abort();
  }, [lat, lon, days]);

  return { data, loading, error };
};
