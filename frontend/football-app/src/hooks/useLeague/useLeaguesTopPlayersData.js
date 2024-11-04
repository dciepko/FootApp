import { useQuery } from "@tanstack/react-query";
import { fetchFootballData } from "../../utils/fetchFootballData";

export function useLeaguesTopPlayersData(leagueId, season = "2024") {
  if (!season) {
    season = "2024";
  }

  return useQuery({
    queryKey: ["leagueTopPlayersData", leagueId, season],
    queryFn: async () => {
      const endpoints = [
        `players/topscorers?league=${leagueId}&season=${season}`,
        `players/topassists?league=${leagueId}&season=${season}`,
        `players/topredcards?league=${leagueId}&season=${season}`,
        `players/topyellowcards?league=${leagueId}&season=${season}`,
      ];

      // Sekwencyjnie wykonujemy zapytania i zbieramy wyniki w tablicy `results`
      const results = [];
      for (const endpoint of endpoints) {
        try {
          const result = await fetchFootballData(endpoint);
          console.log(`Data for ${endpoint}:`, result);
          results.push(result);
        } catch (error) {
          console.error(`Error fetching ${endpoint}:`, error);
          results.push(null); // Można również użyć innej obsługi błędów
        }
      }

      return results;
    },
    staleTime: 10 * 60 * 1000,
  });
}
