import {
    Badge,
    Box,
    Heading,
    HStack,
    SimpleGrid,
    Spinner,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { useUserLocation } from "../../hooks/useUserLocation";
import { useWeather } from "../../hooks/useWeather";

const DEFAULT_LAT = 55.6761; // Copenhagen
const DEFAULT_LON = 12.5683;

const prettyDay = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
};

const WeatherSection = () => {
  const location = useUserLocation();

  const lat = location.lat ?? DEFAULT_LAT;
  const lon = location.lon ?? DEFAULT_LON;

  const { data, loading, error } = useWeather({ lat, lon, days: 7 });

  const cards = useMemo(() => {
    const daily = data?.daily;
    if (!daily) return [];

    return daily.time.map((t, i) => ({
      date: t,
      max: daily.temperature_2m_max?.[i],
      min: daily.temperature_2m_min?.[i],
      rainPct: daily.precipitation_probability_max?.[i],
    }));
  }, [data]);

  const locationBadge = useMemo(() => {
    if (location.loading) return { label: "Locating...", scheme: "gray" as const };
    if (location.permission === "granted")
      return { label: "Your location", scheme: "green" as const };
    return { label: "Default location", scheme: "blue" as const };
  }, [location.loading, location.permission]);

  return (
    <Box
      p={6}
      bg="white"
      borderWidth="1px"
      borderColor="gray.200"
      rounded="md"
      shadow="sm"
      color="gray.700"
    >
      <HStack justify="space-between" align="center" mb={4}>
        <Heading size="md" color="gray.700">
          Weather
        </Heading>

        <HStack spacing={2}>
          <Badge colorScheme="purple" variant="subtle">
            Next 7 days
          </Badge>
          <Badge colorScheme={locationBadge.scheme} variant="subtle">
            {locationBadge.label}
          </Badge>
        </HStack>
      </HStack>

      {/* Location warning (soft, not blocking) */}
      {!location.loading && location.error && (
        <Text fontSize="xs" color="gray.500" mb={2}>
          {location.error} Using fallback coordinates.
        </Text>
      )}

      {loading && (
        <HStack>
          <Spinner size="sm" />
          <Text fontSize="sm" color="gray.600">
            Loading forecast...
          </Text>
        </HStack>
      )}

      {error && (
        <Text fontSize="sm" color="red.500">
          {error}
        </Text>
      )}

      {!loading && !error && cards.length > 0 && (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={3}>
          {cards.map((c) => (
            <Box
              key={c.date}
              p={3}
              borderWidth="1px"
              borderColor="gray.200"
              rounded="md"
              bg="gray.50"
            >
              <VStack align="start" spacing={1}>
                <Text fontWeight="semibold">{prettyDay(c.date)}</Text>

                <HStack spacing={2}>
                  <Badge colorScheme="red" variant="subtle">
                    {c.max != null ? `${Math.round(c.max)}°` : "-"}
                  </Badge>
                  <Badge colorScheme="blue" variant="subtle">
                    {c.min != null ? `${Math.round(c.min)}°` : "-"}
                  </Badge>
                </HStack>

                <Text fontSize="xs" color="gray.600">
                  Rain: {c.rainPct != null ? `${c.rainPct}%` : "—"}
                </Text>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      )}

      {!loading && !error && cards.length === 0 && (
        <Text fontSize="sm" color="gray.600">
          No forecast available.
        </Text>
      )}
    </Box>
  );
};

export default WeatherSection;
