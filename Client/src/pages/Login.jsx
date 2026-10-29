import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await login(email, password);
            navigate("/");
        }
        catch (err) {
            setError(err.message + "Invalid email or password");
        }
    };
    return (
        <form onSubmit={handleSubmit} className="form-card">
            <h2> Admin login</h2>
            <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
            {error && <p className="form-error">{error}</p>}
        </form >
    );

};
export default Login;