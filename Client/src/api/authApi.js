import api  from "./axios";

export const login= async(userName, password)=>{
  const response =await api.post("/auth/login",{userName, password});
  return response.data;
};