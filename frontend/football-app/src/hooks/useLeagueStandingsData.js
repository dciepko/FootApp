import { useQuery } from "@tanstack/react-query";
import { fetchFootballData } from "../utils/fetchFootballData";

export function useLeagueStandingsData(leagueId, season = "2024") {
  if (season === null) {
    season = "2024";
  }
  return useQuery({
    queryKey: ["leagueStandingsData", leagueId],
    queryFn: () =>
      fetchFootballData(`standings?league=${leagueId}&season=${season}`),
    staleTime: 10 * 60 * 1000,
  });
}
