const ProductCard = ({product}) => {
    return (
        <div>
            <h2>{product.name}</h2>
            <p>{product.categoryName}</p>
            <p> {product.price}</p>
        </div>);
};

export default ProductCard;