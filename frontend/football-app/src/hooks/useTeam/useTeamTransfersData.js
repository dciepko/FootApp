import { useQuery } from "@tanstack/react-query";
import { fetchFootballData } from "../../utils/fetchFootballData";

export function useTeamTransfersData(teamId) {
  return useQuery({
    queryKey: ["teamTransfersData", teamId],
    queryFn: () => fetchFootballData(`transfers?team=${teamId}`),
    staleTime: 10 * 60 * 1000,
  });
}
