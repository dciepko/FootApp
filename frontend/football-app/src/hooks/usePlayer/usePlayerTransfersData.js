import { useQuery } from "@tanstack/react-query";
import { fetchFootballData } from "../../utils/fetchFootballData";

export function usePlayerTransfersData(playerId) {
  return useQuery({
    queryKey: ["playerTransfersData", playerId],
    queryFn: () => fetchFootballData(`transfers?player=${playerId}`),
    staleTime: 10 * 60 * 1000,
  });
}
