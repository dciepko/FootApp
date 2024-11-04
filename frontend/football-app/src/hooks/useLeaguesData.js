import { useQuery } from "@tanstack/react-query";
import { fetchFootballData } from "../utils/fetchFootballData";

export function useLeaguesData() {
  return useQuery({
    queryKey: ["leagueData"],
    queryFn: () => fetchFootballData(`leagues`),
    staleTime: 10 * 60 * 1000,
  });
}
