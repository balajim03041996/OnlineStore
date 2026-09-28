import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../api/productsApi"
import ProductForm from "../components/ProductForm";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        getProductById(id).then((data) => setProduct(data));
    }, [id])
    const handleUpdate = async (updated) => {
        await updateProduct(id, updated);
        navigate(`/item/${id}`);
    }
    if (!product) {
        return <p> Loading...</p>
    }
    return (
        <ProductForm
            title="Edit Product"
            submitLable="Update Product"
            initialValues={product}
            onSubmit={handleUpdate} />
    );
};
export default EditProduct;