import { useQuery } from "@tanstack/react-query";
import { fetchFootballData } from "../../utils/fetchFootballData";

export function useSearchPlayerData(entityType, entityId, input) {
  return useQuery({
    queryKey: ["searchPlayerData", entityType, entityId, input],
    queryFn: async () => {
      if (!entityId || !input) return [];

      let endpoint = "";
      switch (entityType) {
        case "team":
          endpoint = `players?team=${entityId}&search=${input}`;
          break;
        case "league":
          endpoint = `players?league=${entityId}&search=${input}`;
          break;
        case "country":
          endpoint = `players?country=${entityId}&search=${input}`;
          break;
        default:
          return [];
      }

      try {
        const result = await fetchFootballData(endpoint);
        console.log(`Data for ${endpoint}:`, result);
        return result.response || [];
      } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        return [];
      }
    },
    enabled: !!entityId && !!input,
    staleTime: 10 * 60 * 1000,
  });
}
