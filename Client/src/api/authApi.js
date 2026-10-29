import api from "./axios";

export const login = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const register = async (fullName, email, password) => {
   await api.post("/auth/register", { fullName, email, password });
};