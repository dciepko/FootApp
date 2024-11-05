import { useQuery } from "@tanstack/react-query";
import { fetchFootballData } from "../../utils/fetchFootballData";

export function useTeamSquadData(teamId) {
  return useQuery({
    queryKey: ["teamSquadData", teamId],
    queryFn: () => fetchFootballData(`players/squads?team=${teamId}`),
    staleTime: 10 * 60 * 1000,
  });
}
