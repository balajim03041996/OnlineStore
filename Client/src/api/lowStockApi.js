import axios from "axios";

export const getLowStock = async (threshold) => {
    const response = await axios.get(`${import.meta.env.VITE_FUNC_URL}/LowStock`, { params: { threshold } });
    return response.data;
};