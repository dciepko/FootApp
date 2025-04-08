import { useQuery } from "@tanstack/react-query";
import { fetchFootballData } from "../../utils/fetchFootballData";

export function useTeamStarterData(teamId) {
  return useQuery({
    queryKey: ["teamStarterData", teamId],
    queryFn: async () => {
      const endpoints = [
        `teams?id=${teamId}`,
        `leagues?team=${teamId}`,
        `teams/seasons?team=${teamId}`,
      ];

      const results = [];
      for (const endpoint of endpoints) {
        try {
          const result = await fetchFootballData(endpoint);
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
