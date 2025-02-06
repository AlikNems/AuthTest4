
import { useMutation } from "@tanstack/react-query";
import { request } from "@/api/request";


const loginUser = async (email: string, password: string) => {
  const res = await request("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.token) {
    console.error("❌ Ошибка: токен не получен!");
    throw new Error("Не удалось получить токен.");
  }

  return { token: res.token };
};


export const useLogin = () => {
  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      loginUser(data.email, data.password),
    onSuccess: (data) => {

      localStorage.setItem("token", data.token);
      console.log("Пользователь залогинен!");
    },
    onError: (error) => {

      console.error("Ошибка логина:", error);
    },
  });
};
