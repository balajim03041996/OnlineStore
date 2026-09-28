import { createProduct } from "../api/productsApi";
import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";

const AddProduct = () => {
    const navigate = useNavigate();

    const handleCreate = async (Product) => {
        const created = await createProduct(Product);
        navigate(`/item/${created.id}`);
    }
    return (
        <ProductForm
            title="Add Product"
            submitLable="Save product"
            onSubmit={handleCreate} />
    );
};
export default AddProduct;