import { request } from "./request";

// Регистрация пользователя
export const registerUser = (email: string, password: string) =>
 request("/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
 });

// Логин пользователя
export const loginUser = async (email: string, password: string) => {
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

// Получение профиля
export const getProfile = async (token: string) => {
 return request("/profile", {
  headers: { Authorization: token },
 });
};
