import AddProduct from "./pages/AddProduct";
import ProductDetails from "./pages/ProductDetails";
import ProductList from "./pages/ProductList";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>    {/* check current url and shows only 1st Route matches*/}
      <Route path="/" element={<ProductList />} />
      <Route path="/item/:id" element={<ProductDetails />} />
      <Route path="/add-product" element={<AddProduct />} />
    </Routes>
  );
}
export default App;