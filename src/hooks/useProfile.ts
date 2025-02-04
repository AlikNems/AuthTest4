import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/api/api";

export const useProfile = (token: string | null) => {
 return useQuery({
  queryKey: ["profile", token], // Ключ кеша
  queryFn: () => getProfile(token!), // Функция запроса
  enabled: !!token, // Запрос делается только если есть токен
 });
};
