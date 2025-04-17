import { useQuery } from "@tanstack/react-query";
import { fetchFootballData } from "../../utils/fetchFootballData";

export function useSearchTeamData(input) {
  return useQuery({
    queryKey: ["searchTeamData", input],
    queryFn: () => fetchFootballData(`teams?search=${input}`),
    staleTime: 10 * 60 * 1000,
  });
}
