import { useQuery } from "@tanstack/react-query";
import { fetchFootballData } from "../../utils/fetchFootballData";

export function useTeamLeaguesData(teamId) {
  return useQuery({
    queryKey: ["teamLeaguesData", teamId],
    queryFn: () => fetchFootballData(`leagues?team=${teamId}`),
    staleTime: 10 * 60 * 1000,
  });
}
