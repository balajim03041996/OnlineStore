import { useCart } from "../context/CartContext";

const Cart = () => {
    const { items, cartCount, removeFromCart, decreaseQuantity,cartTotal } = useCart();
    return (
        <div>
            <h2>{cartCount}</h2>
            <div>{items.map((x) =>
                <div key={x.product.id}>  {x.product.name} -₹{x.product.price} x {x.quantity}
                    <button key={x.product.id} onClick={() => removeFromCart(x.product.id)}>Remove</button>
                    <button key={x.product.id} onClick={() => decreaseQuantity(x.product.id)}>delete quantity</button></div>)}
                    <h3>Total: ₹{cartTotal.toFixed(2)}</h3>
            </div>
        </div>
    );
}; export default Cart;