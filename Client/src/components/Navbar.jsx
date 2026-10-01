import { Link } from "react-router-dom";
import "./Navbar.css"
import { useCart } from "../context/CartContext";


const Navbar = () => {
    const { cartCount } = useCart();
    return (
        <nav className="navbar " >
            <Link to="/" className="navbar-brand" >OnlineStore</Link>
            <div className="navbar-links" >
                <Link to="/add-product" >   Add Product</Link>
                <span>Cart ({cartCount})</span>
            </div>
            <div >
                <Link to="/cart" > Cart</Link>
            </div>
        </nav>
    );
};
export default Navbar;