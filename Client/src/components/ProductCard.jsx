const ProductCard = ({product}) => {
    return (
        <div>
            <h2>{product.name}</h2>
            <p style={{color:"blue"}} >{product.categoryName}</p>
            <p style={{color: "darkgreen"}}> {product.price}</p>
        </div>);
};

export default ProductCard;