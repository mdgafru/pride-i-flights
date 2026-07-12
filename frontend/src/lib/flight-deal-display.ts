import type { Route } from "@/types/route";

export type FlightDeal = {
  id: string;
  airline: string;
  airlineCode: string;
  routeLabel: string;
  fromCity: string;
  toCity: string;
  fromCode: string;
  toCode: string;
  departure: string;
  arrival: string;
  duration: string;
  stopType: "Non-stop" | "1 Stop";
  slug: string;
};

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function padTime(hour: number, minute: number) {
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function formatDuration(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
}

function airlineInitials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return `${words[0][0] || ""}${words[1][0] || ""}`.toUpperCase();
  }
  return name.trim().slice(0, 2).toUpperCase() || "RF";
}

export function buildFlightDeal(route: Route): FlightDeal {
  const seed = hashString(route.id);
  const airline = route.airline_name?.trim() || "Best Available Airline";
  const fromCode = route.from_airport_code || route.from_city.slice(0, 3).toUpperCase();
  const toCode = route.to_airport_code || route.to_city.slice(0, 3).toUpperCase();

  const depHour = 5 + (seed % 16);
  const depMinute = [0, 10, 15, 20, 30, 45][seed % 6];
  const durationMinutes = 185 + (seed % 520);
  const arrivalTotal = depHour * 60 + depMinute + durationMinutes;
  const arrHour = Math.floor(arrivalTotal / 60) % 24;
  const arrMinute = arrivalTotal % 60;

  const stopType = durationMinutes > 420 && seed % 3 === 0 ? "1 Stop" : "Non-stop";

  return {
    id: route.id,
    airline,
    airlineCode: route.airline_iata_code?.trim() || airlineInitials(airline),
    routeLabel: `${route.from_city} → ${route.to_city}`,
    fromCity: route.from_city,
    toCity: route.to_city,
    fromCode,
    toCode,
    departure: padTime(depHour, depMinute),
    arrival: padTime(arrHour, arrMinute),
    duration: formatDuration(durationMinutes),
    stopType,
    slug: route.slug,
  };
}

export function sortFlightDeals(
  deals: FlightDeal[],
  sortBy: "newest" | "route" | "airline",
) {
  const sorted = [...deals];
  if (sortBy === "route") {
    sorted.sort((a, b) => a.routeLabel.localeCompare(b.routeLabel));
  } else if (sortBy === "airline") {
    sorted.sort((a, b) => a.airline.localeCompare(b.airline));
  }
  return sorted;
}

export function buildFlightEnquiryUrl(fromCity: string, toCity: string, airline: string) {
  const text = `Hi REDE FLIGHTS, I want to book a flight from ${fromCity} to ${toCity}${airline ? ` (${airline})` : ""}. Please share the best fare.`;
  return `https://wa.me/971509513634?text=${encodeURIComponent(text)}`;
}
