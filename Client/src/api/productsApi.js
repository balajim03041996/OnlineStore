import api from "./axios";


// get /api/prducts- all products
export const getProducts = async () => {
    const response = await api.get('/products');
    return response.data; // axios puts json body in .data
}
export const getProductById = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;   // axios puts json body in data.
}