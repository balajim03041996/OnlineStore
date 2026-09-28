import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../api/productsApi";
import { deleteProduct } from "../api/productsApi";



const ProductDetails = () => {
    const { id } = useParams(); // read id from url
    const [productDetail, setProductDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProductById(id)
            .then((data) => setProductDetail(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);
    const navigate = useNavigate();
    const handleDelete = async () => {
        const ok = window.confirm(`Delete "${productDetail.name}" ? This cannot be undone.`);
        if (!ok) {
            return; // clicked cancelled
        }
        try {
            await deleteProduct(productDetail.id);
            navigate("/");

        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return <p> loading productdetails...</p>
    }
    if (error) {
        return <p style={{ color: "red" }}> Error: {error}</p>
    }
    return (
        <div>
            <img src={productDetail.imageUrl || 'https://placehold.co/400x300?text=No+Image'} alt={productDetail.name} style={{ maxWidth: '400px', width: '100%' }} />
            <h1>{productDetail.name}</h1>
            <p>{productDetail.categoryName} </p>
            <p>{productDetail.description}</p>
            <h2>₹{productDetail.price}</h2>
            <p>{productDetail.stockQuantity}</p>
            <button onClick={()=>navigate(`/item/${productDetail.id}/edit`)}>Edit Product </button>
            <button onClick={handleDelete} > Delete product</button>
        </div >
    );
};
export default ProductDetails;