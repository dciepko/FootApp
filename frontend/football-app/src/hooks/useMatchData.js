import { useQuery } from "@tanstack/react-query";
import { fetchFootballData } from "../utils/fetchFootballData";

// Funkcja hooka dla meczu
export function useMatchData(matchId) {
  return useQuery({
    queryKey: ["matchData", matchId],
    queryFn: () => fetchFootballData(`fixtures/${matchId}`),
    staleTime: 10 * 60 * 1000,
  });
}
