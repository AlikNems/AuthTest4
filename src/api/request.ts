const API_URL = "https://backend-ashen-seven-22.vercel.app";

export const request = async (url: string, options?: RequestInit) => {
 const res = await fetch(`${API_URL}${url}`, options);
 const data = await res.json();

 if (!res.ok) {
  console.error(`🔴 Ошибка запроса (${API_URL}${url}):`, data.message || "Ошибка запроса");
  throw new Error(data.message || "Ошибка запроса");
 }

 return data;
};
