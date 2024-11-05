import { useQuery } from "@tanstack/react-query";
import { fetchFootballData } from "../../utils/fetchFootballData";

export function useTeamStandingsData(season, teamId) {
  return useQuery({
    queryKey: ["teamStandingssData", season, teamId],
    queryFn: () =>
      fetchFootballData(`standings?season=${season}&team=${teamId}`),
    staleTime: 10 * 60 * 1000,
  });
}
