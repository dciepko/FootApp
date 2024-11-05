import { useQuery } from "@tanstack/react-query";
import { fetchFootballData } from "../../utils/fetchFootballData";

export function usePlayerStatisticsAndInfoData(playerId, season) {
  return useQuery({
    queryKey: ["playerStatisticsAndInfoData", playerId, season],
    queryFn: () => fetchFootballData(`players?id=${playerId}&season=${season}`),
    staleTime: 10 * 60 * 1000,
  });
}
