import { useEffect, useState } from "react";
import getCategories from "../api/categoriesApi";



const emptyForm = {
    name: "",
    description: "",
    categoryId: "",
    price: "",
    stockQuantity: "",
    imageUrl: "",
};


const ProductForm = ({ title, initialValues = emptyForm, submitLable, onSubmit }) => {
    const [form, setForm] = useState(initialValues);
    const [catergories, setCatergories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        getCategories(controller.signal)
            .then((data) => setCatergories(data))
            .catch((err) => {
                if (err.message == "CanceledError")
                    return;
                console.error(err);
            });


        return () => controller.abort();

    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        const product = {
            ...form,
            categoryId: Number(form.categoryId),
            price: Number(form.price),
            stockQuantity: Number(form.stockQuantity),
            imageUrl: form.imageUrl || null,
        };
        try {
            await onSubmit(product);
        }
        catch (err) {
            const data = err.response?.data;
            if (data?.errors) {
                setError(Object.values(data.errors).flat().join(" "));
            }
            else {
                setError(data?.title ?? data ?? err.message);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-card">
            <h1> {title}</h1>
            {error && <p className="form-error">{error}</p>}
            <label>Name<input name="name" value={form.name} onChange={handleChange} /></label>
            <label>Description<input name="description" value={form.description} onChange={handleChange} /></label>
            <label>Price<input name="price" value={form.price} onChange={handleChange} /></label>
            <label>Category
                <select name="categoryId" value={form.categoryId} onChange={handleChange}>
                    <option value=""> -- Select a category</option>
                    {catergories.map((x) => (<option key={x.id} value={x.id}>{x.name}</option>))}
                </select>
            </label>
            <label>Stock<input name="stockQuantity" type="number" value={form.stockQuantity} onChange={handleChange} /></label>
            <label>Image Url<input name="imageUrl" value={form.imageUrl} onChange={handleChange} /></label>
            <button type="submit">{submitLable}</button>
        </form >);

};
export default ProductForm;