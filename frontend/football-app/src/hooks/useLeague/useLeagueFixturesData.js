import { useQuery } from "@tanstack/react-query";
import { fetchFootballData } from "../../utils/fetchFootballData";

export function useLeagueFixturesData(leagueId, season = "2024") {
  if (season === null) {
    season = "2024";
  }
  return useQuery({
    queryKey: ["leagueFixturesData", leagueId, season],
    queryFn: () =>
      fetchFootballData(`fixtures?league=${leagueId}&season=${season}`),
    staleTime: 10 * 60 * 1000,
  });
}
