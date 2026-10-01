import { useCart } from "../context/CartContext";

const Cart = () => {
    const { items, cartCount, removeFromCart } = useCart();
    return (
        <div>
            <h>{cartCount}</h>
            <div>{items.map((x) =>
                <div key={x.product.id}>  {x.product.name} -₹{x.product.price} x {x.quantity}
                    <button key={x.product.id} onClick={() => removeFromCart(x.product.id)}>Remove</button></div>)}
            </div>
        </div>


    );
}; export default Cart;