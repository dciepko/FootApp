import { useQuery } from "@tanstack/react-query";
import { fetchFootballData } from "../utils/fetchFootballData";

// Funkcja hooka, np. dla danych ligi
export function useLeagueStandingsData(leagueId, season = "2024") {
  return useQuery({
    queryKey: ["leagueData", leagueId],
    queryFn: () =>
      fetchFootballData(`standings?league=${leagueId}&season=${season}`),
    staleTime: 10 * 60 * 1000, // Ustawienie czasu cache'u na 10 minut
  });
}
