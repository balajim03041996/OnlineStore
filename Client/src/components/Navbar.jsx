import { Link } from "react-router-dom";
import "./Navbar.css"


const Navbar = () => {
    return (
        <nav className="navbar " >
            <Link to="/" className="navbar-brand" >OnlineStore</Link>
            <div className="navbar-link" >
                <Link to="/add-product" >   AddProduct</Link>
            </div>
        </nav>
    );
};
export default Navbar;