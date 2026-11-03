import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";

const Login = () => {
    const { valuesUF: form, handleChangeUF: handleChange } = useForm({ email: "", password: "" });
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await login(form.email, form.password);
            navigate("/");
        }
        catch (err) {
            setError("Invalid email or password");
        }
    };
    return (
        <form onSubmit={handleSubmit} className="form-card">
            <h2> Admin login</h2>
            <input type="email" placeholder="email" name="email" value={form.email} onChange={(e) => handleChange(e)} />
            <input type="password" placeholder="password" name="Password" value={form.password} onChange={(e) => handleChange(e)} />
            <button type="submit">Login</button>
            {error && <p className="form-error">{error}</p>}
        </form >
    );

};
export default Login;