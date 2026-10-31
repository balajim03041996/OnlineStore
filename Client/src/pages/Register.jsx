import { useState } from "react";
import { register } from "../api/authApi";
import { useNavigate } from "react-router-dom";


const EmptyCredential = {
    fullName: "",
    email: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: ""
}



const Register = () => {
    const [credential, setCredential] = useState(EmptyCredential);
    const [errCrd, setErrCrd] = useState({});
    const [serverError, setServerError] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (e) => {

        e.preventDefault();
        const localError = {};
        if (credential.fullName.trim() === "") {
            localError.UserName = "UserName is invalid";
        }
        if (!credential.email.includes("@")) {
            localError.emailId = "email is invalid";
        }
        const cutoff = new Date();
        cutoff.setFullYear(cutoff.getFullYear() - 18);
        if (!credential.dateOfBirth) {
            localError.dobData = "Date of birth is required";
        }
        else if (new Date(credential.dateOfBirth) > cutoff) {
            localError.dobData = "You must be at least 18";
        }
        if (credential.password.length < 8) {
            localError.errPassword = "Password should atleast 8 character";
        }
        if (credential.confirmPassword !== credential.password) {
            localError.errConfirmPassword = "Passwords do not match";
        }
        setErrCrd(localError);
        if (Object.keys(localError).length == 0) {
            try {
                const { confirmPassword, ...userData } = credential;
                await register(userData);
                navigate("/login");
            }
            catch (err) {
                if (err.response?.status === 409)
                    setServerError("Email already registered");
                else
                    setServerError("Registration failed, try again");

            }
        }
        else {
            setServerError("");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredential({ ...credential, [name]: value });
    };

    return (<form onSubmit={(e) => handleSubmit(e)} className="form-card">
        <h2>Sign up</h2>
        <div>{serverError && <p style={{ color: "red" }}>{serverError}</p>}</div>
        <div>
            <label>User Name
                <input type="text" name="fullName" value={credential.fullName} onChange={(e) => handleChange(e)} />
                {errCrd.UserName && <p style={{ color: "red" }}>{errCrd.UserName}</p>}
            </label>
        </div>
        <div>
            <label >Email
                <input type="email" name="email" value={credential.email} onChange={(e) => handleChange(e)} />
                {errCrd.emailId && <p style={{ color: "red" }} >{errCrd.emailId}</p>}
            </label>
        </div>
        <div>
            <label > DOB
                <input type="date" name="dateOfBirth" value={credential.dateOfBirth} onChange={(e) => handleChange(e)} />
                {errCrd.dobData && <p style={{ color: "red" }}>{errCrd.dobData}</p>}

            </label>
        </div>
        <div>
            <label> Password
                <input type="password" name="password" value={credential.password} onChange={(e) => handleChange(e)} />
                {errCrd.errPassword && <p style={{ color: "red" }}>{errCrd.errPassword}</p>}
            </label>
        </div>
        <div>
            <label> Confirm password
                <input type="password" name="confirmPassword" value={credential.confirmPassword} onChange={(e) => handleChange(e)} />
                {errCrd.errConfirmPassword && <p style={{ color: "red" }}>{errCrd.errConfirmPassword}</p>}
            </label>
            <div>
                <button type="submit"> Register</button>
            </div>
        </div>
    </form>);
};
export default Register;