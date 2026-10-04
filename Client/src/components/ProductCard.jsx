import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    return (
        <Link to={`/item/${product.id}`} className='product-card' >
            <img src={product.imageUrl||'https://placehold.co/400x300?text=No+Image'} alt={product.name} />
            <div className='product-card-body'>
                <h2 className='product-card-name' >{product.name}</h2>
                <p className='product-card-category'>{product.categoryName}</p>
                <p className='product-card-price'>₹{product.price}</p>
            </div>
        </Link>);
        
};

export default ProductCard;