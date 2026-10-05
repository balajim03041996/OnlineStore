import api from "./axios";


const getCategories = async (signal) => {
    const response = await api.get("/categories", { signal });
    return response.data;
}
export default getCategories;