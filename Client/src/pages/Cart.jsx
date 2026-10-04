import { useCart } from "../context/CartContext";
import "./Cart.css";

const Cart = () => {
    const { items, cartCount, removeFromCart, decreaseQuantity,cartTotal } = useCart();
    return (
        <div className="cart">
            <h2>Cart ({cartCount} items)</h2>
            <div>{items.map((x) =>
                <div key={x.product.id} className="cart-row">  <span>{x.product.name} - ₹{x.product.price} x {x.quantity}</span>
                    <div className="cart-row-actions">
                    <button className="btn-outline" onClick={() => decreaseQuantity(x.product.id)}>delete quantity</button>
                    <button className="btn-danger" onClick={() => removeFromCart(x.product.id)}>Remove</button></div></div>)}
                    <h3 className="cart-total">Total: ₹{cartTotal.toFixed(2)}</h3>
            </div>
        </div>
    );
}; export default Cart;
