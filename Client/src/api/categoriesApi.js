import api from "./axios";


const getCategories = async () => {
    const response = await api.get("/categories");
    return response.data;
}
export default getCategories;