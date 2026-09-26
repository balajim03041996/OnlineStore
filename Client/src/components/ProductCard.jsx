import './ProductCard.css';

const ProductCard = ({product}) => {
    return (
        <div className="product-card">
            <img src={product.imageUrl} alt={product.name}/>
            <div className='product-card-body'>
            <h2 className='product-card-name' >{product.name}</h2>
            <p className='product-card-category'>{product.categoryName}</p>
            <p className='product-card-price'> {product.price}</p>
            </div>
        </div>);
};

export default ProductCard;