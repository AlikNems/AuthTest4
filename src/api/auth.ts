// src/api/auth.ts
const API_URL = "https://backend-ashen-seven-22.vercel.app";



export const registerUser = async (email: string, password: string) => {
  const requestBody = { email, password };

  console.log("Отправляемые данные:", requestBody); // Логируем данные перед отправкой

  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  const responseData = await res.json();
  console.log("Ответ сервера:", responseData); // Логируем ответ

  if (!res.ok) {
    throw new Error(responseData.message || "Ошибка регистрации");
  }

  return responseData;
};





export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Ошибка авторизации");
  }

  return res.json();
};




export const getProfile = async (token: string) => {
  console.log("Токен, передаваемый в getProfile:", token); // Проверяем токен

  const res = await fetch(`${API_URL}/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Передаем токен в заголовке
    },
  });

  const data = await res.json();
  console.log("Ответ сервера на getProfile:", data); // Логируем ответ

  if (!res.ok) {
    throw new Error(data.message || "Ошибка получения профиля");
  }

  return data;
};
