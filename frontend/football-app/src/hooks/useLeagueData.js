import { useQuery } from "@tanstack/react-query";
import { fetchFootballData } from "../utils/fetchFootballData";

// Funkcja hooka, np. dla danych ligi
export function useLeagueData(leagueId) {
  return useQuery({
    queryKey: ["leagueData", leagueId],
    queryFn: () => fetchFootballData(`leagues?id=${leagueId}`),
    staleTime: 10 * 60 * 1000, // Ustawienie czasu cache'u na 10 minut
  });
}
