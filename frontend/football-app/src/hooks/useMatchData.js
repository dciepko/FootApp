import { useQuery } from "@tanstack/react-query";
import { fetchFootballData } from "../utils/fetchFootballData";

export function useMatchData(matchId) {
  return useQuery({
    queryKey: ["matchData", matchId],
    queryFn: () => fetchFootballData(`fixtures?id=${matchId}`),
    staleTime: 10 * 60 * 1000,
  });
}
