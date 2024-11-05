import { useQuery } from "@tanstack/react-query";
import { fetchFootballData } from "../../utils/fetchFootballData";

export function useTeamFixturesData(season, teamId) {
  return useQuery({
    queryKey: ["teamFixturesData", season, teamId],
    queryFn: () =>
      fetchFootballData(`fixtures?season=${season}&team=${teamId}`),
    staleTime: 10 * 60 * 1000,
  });
}
