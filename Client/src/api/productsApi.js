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
export const createProduct = async (product) => {
    const response = await api.post("/products", product);
    return response.data;  //created product with new id
}
export const deleteProduct = async (id) => {
  const response= await api.delete(`/products/${id}`);
  return response;
}
export const updateProduct= async(id, product)=>{
    const response = await api.put(`/products/${id}`, product);
    return response.data;
}