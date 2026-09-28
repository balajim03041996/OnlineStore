import Navbar from "./components/Navbar";
import AddProduct from "./pages/AddProduct";
import ProductDetails from "./pages/ProductDetails";
import ProductList from "./pages/ProductList";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>    {/* (most specific) match, */}
      <Route path="/" element={<ProductList />} />
      <Route path="/item/:id" element={<ProductDetails />} />
      <Route path="/add-product" element={<AddProduct />} />
    </Routes>
    </>
  );
};
export default App;