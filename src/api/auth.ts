const API_URL = "https://backend-ashen-seven-22.vercel.app";

const request = async (url: string, options?: RequestInit) => {

 const res = await fetch(`${API_URL}${url}`, options);
 const data = await res.json();


 if (!res.ok) {
  console.error(
   `🔴 Ошибка запроса (${API_URL}${url}):`,
   data.message || "Ошибка запроса"
  );
  throw new Error(data.message || "Ошибка запроса");
 }

 return data;
};

export const registerUser = (email: string, password: string) =>
 request("/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
 });

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

export const getProfile = async (token: string) => {
 try {
  const response = await request("/profile", {
   headers: { 'Authorization': `${token}` },
  });
  return response;
 } catch (error) {
  console.error("Error fetching profile:", error);
  throw error;
 }
};
