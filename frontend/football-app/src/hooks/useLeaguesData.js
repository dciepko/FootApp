import { useQuery } from "@tanstack/react-query";
import { fetchFootballData } from "../utils/fetchFootballData";

// Funkcja hooka, np. dla danych ligi
export function useLeaguesData() {
  return useQuery({
    queryKey: ["leagueData"],
    queryFn: () => fetchFootballData(`leagues`),
    staleTime: 10 * 60 * 1000, // Ustawienie czasu cache'u na 10 minut
  });
}
