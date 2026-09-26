import { useState, useEffect } from "react";
import { getProducts } from '../api/productsApi';
import ProductCard from '../components/ProductCard';

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
        return <p> Loading Products</p>
    }
    if (error) {
        return <p style={{ color: 'red' }}> Error: {error} </p>;
    }
    return (
        <div>
            <h1>Products</h1>
            {products.map((x => (
                <ProductCard key={x.id} product={x} />
            )))}
        </div>
    );
}

export default ProductList;