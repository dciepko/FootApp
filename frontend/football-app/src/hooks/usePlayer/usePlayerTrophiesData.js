import { useQuery } from "@tanstack/react-query";
import { fetchFootballData } from "../../utils/fetchFootballData";

export function usePlayerTrophiesData(playerId) {
  return useQuery({
    queryKey: ["playerTrophiesData", playerId],
    queryFn: () => fetchFootballData(`trophies?player=${playerId}`),
    staleTime: 10 * 60 * 1000,
  });
}
