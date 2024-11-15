import { useQuery } from "@tanstack/react-query";
import { fetchFootballData } from "../utils/fetchFootballData";

export function useFixturesLiveData() {
  return useQuery({
    queryKey: ["fixtureLiveData"],
    queryFn: () => fetchFootballData(`fixtures?live=all`),
    staleTime: 10 * 60 * 1000,
  });
}
