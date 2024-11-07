import { useQuery } from "@tanstack/react-query";
import { fetchFootballData } from "../utils/fetchFootballData";

export function useOddsData() {
  return useQuery({
    queryKey: ["oddsData"],
    queryFn: () => fetchFootballData(`odds/live`),
    staleTime: 10 * 60 * 1000,
  });
}
