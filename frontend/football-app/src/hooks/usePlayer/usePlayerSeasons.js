import { useQuery } from "@tanstack/react-query";
import { fetchFootballData } from "../../utils/fetchFootballData";

export function usePlayerSeasonsData(playerId) {
  return useQuery({
    queryKey: ["playerSeasonsData", playerId],
    queryFn: () => fetchFootballData(`players/seasons?player=${playerId}`),
    staleTime: 10 * 60 * 1000,
  });
}
