// src/api/auth.ts
const API_URL = "https://backend-ashen-seven-22.vercel.app";



export const registerUser = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Ошибка регистрации");
  }

  return res.json();
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
  const res = await fetch(`${API_URL}/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Ошибка загрузки профиля");
  }

  return res.json();
};
