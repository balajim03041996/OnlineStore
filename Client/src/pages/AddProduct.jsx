import { useEffect, useState } from "react";
import getCategories from "../api/categoriesApi";
import { createProduct } from "../api/productsApi";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    // state holds every fields of form
    const [form, setForm] = useState({
        name: "",
        description: "",
        categoryId: "",
        price: "",
        stockQuantity: "",
        imageUrl: "",
    });

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        getCategories().then((data) => setCategories(data));
    }, []);

    // state hold every input of form
    const handleChange = (e) => {
        const { name, value } = e.target; //which input for eg name or price, what type int it for eg: "s" or "a"
        setForm({ ...form, [name]: value });// copy form , overwrite that one field

    };
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const newProduct = {
                ...form,
                categoryId: Number(form.categoryId),
                price: Number(form.price),
                stockQuantity: Number(form.stockQuantity),
                imageUrl:form.imageUrl||null,
            };
            const created = await createProduct(newProduct);
            navigate(`/item/${created.id}`);
        }
        catch (err) {
            setError(err.response?.data?.title ?? err.message);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h1 style={{ color: "aquamarine" }}>Add Product</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <label>
                Name
                <input name="name" value={form.name} onChange={handleChange} />
            </label>
            <label>
                Description
                <input name="description" value={form.description} onChange={handleChange} />
            </label>
            <label>
                Price
                <input name="price" value={form.price} onChange={handleChange} />
            </label>
            <label>
                Category
                <select name="categoryId" value={form.categoryId} onChange={handleChange} >
                    <option value="">---Select a category</option>
                    {categories.map((x) => (<option key={x.id} value={x.id} >{x.name}</option>))}
                </select>
            </label>
            <label>
                Stock
                <input name="stockQuantity" type="number" value={form.stockQuantity} onChange={handleChange} />
            </label>
            <label>
                Image URL
                <input name="imageUrl" value={form.imageUrl} onChange={handleChange} />
            </label>
            <button type="submit">Save product</button>
        </form>
    );
};

export default AddProduct;