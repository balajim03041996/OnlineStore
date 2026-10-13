import Navbar from "./components/Navbar";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ProductDetails from "./pages/ProductDetails";
import ProductList from "./pages/ProductList";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import LowStock from "./pages/LowStock";
import HooksDemo from "./pages/HooksDemo";
import TodoDrill from "./practise/TodoDrill";
import UserDrill from "./practise/UsersDrill";
import ShoppingDrill from "./practise/ShoppingDrill"
import MarksDrill from "./practise/MarksDrill"
import ExpenseDrill from "./practise/ExpenseDrill";

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
        <Route path="/login" element={<Login />} />
        <Route path="/low-stock" element={<LowStock />} />
        <Route path="/hook-demo" element={<HooksDemo />} />
        <Route path="/TodoList" element={<TodoDrill />} />
        <Route path="/users" element={<UserDrill />} />
        <Route path="/Shopping" element={<ShoppingDrill />} />
        <Route path="/StudentDetails" element={<MarksDrill />} />
         <Route path="/ExpenseTracker" element={<ExpenseDrill />} />
      </Routes>
    </>
  );
};
export default App;