import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";




const Navbar = () => {
    const { cartCount } = useCart();
    const { isLoggedIn, isAdmin, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="navbar " >
            <Link to="/" className="navbar-brand" >OnlineStore</Link>
            <div className="navbar-links" >
                {isAdmin && <Link to="/add-product" >   Add Product</Link>}
                {isAdmin && <Link to="/low-stock">Low Stock</Link>}
                <span>Cart ({cartCount})</span>
            </div>
            <div className="navbar-links">
                <Link to="/cart" > Cart</Link>
                {isLoggedIn ? <button onClick={handleLogout}>logout</button>
                    : <>
                        <Link to="/login">login</Link>
                        <Link to="/signup">signup</Link>
                    </>}
            </div>
        </nav >
    );
};
export default Navbar;