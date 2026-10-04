import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../api/productsApi";
import { deleteProduct } from "../api/productsApi";
import {useCart} from "../context/CartContext";
import "./ProductDetails.css";


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
    const {addToCart}= useCart();
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
        return <p className="status"> loading productdetails...</p>
    }
    if (error) {
        return <p className="status status-error"> Error: {error}</p>
    }
    return (
        <div className="details">
            <img className="details-image" src={productDetail.imageUrl || 'https://placehold.co/400x300?text=No+Image'} alt={productDetail.name} />
            <div className="details-info">
                <span className="badge">{productDetail.categoryName}</span>
                <h1>{productDetail.name}</h1>
                <p className="details-description">{productDetail.description}</p>
                <h2 className="details-price">₹{productDetail.price}</h2>
                <p className="details-stock">{productDetail.stockQuantity > 0 ? `${productDetail.stockQuantity} in stock` : "Out of stock"}</p>
                <div className="details-actions">
                    <button onClick={()=> addToCart(productDetail)}>Add to Cart</button>
                    <button className="btn-outline" onClick={()=>navigate(`/item/${productDetail.id}/edit`)}>Edit Product </button>
                    <button className="btn-danger" onClick={handleDelete} > Delete product</button>
                </div>
            </div>
        </div >
    );
};
export default ProductDetails;