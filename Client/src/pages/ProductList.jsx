import { useState, useEffect } from "react";
import { getProducts } from '../api/productsApi';
import ProductCard from '../components/ProductCard';
import './ProductList.css';

const ProductList = () => {
    const [products, setproducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProducts()
            .then((data) => setproducts(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }, []);
    if (loading) {
        return <p className="status"> Loading Products...</p>
    }
    if (error) {
        return <p className="status status-error"> Error: {error} </p>;
    }
    return (
        <div>
            <div className="page-header">
                <h1>Products</h1>
                <span className="product-count">{products.length} products</span>
            </div>
            <div  className="product-grid">{products.map((x => (
                <ProductCard key={x.id} product={x} />
            )))}</div>
        </div>
    );
}

export default ProductList;