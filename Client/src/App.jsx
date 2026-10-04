import Navbar from "./components/Navbar";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ProductDetails from "./pages/ProductDetails";
import ProductList from "./pages/ProductList";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import LowStock from "./pages/LowStock";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>    {/* (most specific) match, */}
        <Route path="/" element={<ProductList />} />
        <Route path="/item/:id" element={<ProductDetails />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/item/:id/edit" element={<EditProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path ="/login" element ={<Login/>}/>
        <Route path ="/low-stock" element={<LowStock />} />
      </Routes>
    </>
  );
};
export default App;