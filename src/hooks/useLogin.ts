// src/hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import { request } from "@/api/request"; // Импортируем функцию запроса

// Функция логина
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

  return { token: res.token }; // Возвращаем токен
};

// Хук для использования логина с React Query
export const useLogin = () => {
  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      loginUser(data.email, data.password),
    onSuccess: (data) => {
      // Сюда можно добавить логику, например, сохранение токена в локальном хранилище
      localStorage.setItem("token", data.token);
      console.log("Пользователь залогинен!");
    },
    onError: (error) => {
      // Обработка ошибок
      console.error("Ошибка логина:", error);
    },
  });
};
