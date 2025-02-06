import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/api/api";

export const useProfile = (token: string | null) => {
 return useQuery({
  queryKey: ["profile", token], 
  queryFn: () => getProfile(token!),
  enabled: !!token,
 });
};
