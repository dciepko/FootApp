import { useQuery } from "@tanstack/react-query";
import { fetchFootballData } from "../../utils/fetchFootballData";

export function useSearchTeamAndLeagueData(input) {
  return useQuery({
    queryKey: ["searchTeamLeagueCountryData", input],
    queryFn: async () => {
      const endpoints = [
        `teams?search=${input}`,
        `leagues?search=${input}`,
        `countries?search=${input}`,
      ];

      const results = [];
      for (const endpoint of endpoints) {
        try {
          const result = await fetchFootballData(endpoint);
          console.log(`Data for ${endpoint}:`, result);
          results.push(result);
        } catch (error) {
          console.error(`Error fetching ${endpoint}:`, error);
          results.push(null);
        }
      }

      return results;
    },
    staleTime: 10 * 60 * 1000,
  });
}
