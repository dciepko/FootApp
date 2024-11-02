import { useQuery } from "@tanstack/react-query";
import { fetchFootballData } from "../utils/fetchFootballData";

// Funkcja hooka, np. dla danych ligi
export function useFixturesLiveData() {
  return useQuery({
    queryKey: ["fixtureLiveData"],
    queryFn: () => fetchFootballData(`fixtures?live=all`),
    staleTime: 10 * 60 * 1000, // Ustawienie czasu cache'u na 10 minut
  });
}
