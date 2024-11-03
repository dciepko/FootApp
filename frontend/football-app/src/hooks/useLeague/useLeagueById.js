import { useQuery } from "@tanstack/react-query";
import { fetchFootballData } from "../../utils/fetchFootballData";

// Funkcja hooka dla meczu
export function useLeagueById(leagueId) {
  return useQuery({
    queryKey: ["singleLeagueData", leagueId],
    queryFn: () => fetchFootballData(`leagues?id=${leagueId}`),
    staleTime: 10 * 60 * 1000,
  });
}
