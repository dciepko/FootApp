import { useQuery } from "@tanstack/react-query";
import { fetchFootballData } from "../../utils/fetchFootballData";

export function useTeamStatisticsData(leagueId, season, teamId) {
  return useQuery({
    queryKey: ["teamStatitsticsData", leagueId, season, teamId],
    queryFn: () =>
      fetchFootballData(
        `teams/statistics?league=${leagueId}&season=${season}&team=${teamId}`
      ),
    staleTime: 10 * 60 * 1000,
  });
}
