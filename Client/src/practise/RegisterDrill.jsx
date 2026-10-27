import { useState } from "react";

const emptyAccount = {
    name: "",
    email: "",
    password: "",
    age: "",
    confirmPassword: ""
};


const RegisterDrill = () => {
    const [account, setAccount] = useState(emptyAccount);
    const [error, setError] = useState({});
    const [sucess, setSucess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccount({ ...account, [name]: value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (account.name.trim() === "") {
            newErrors.errName = "name field is required";
        }
        if (!account.email.includes("@")) {
            newErrors.errEmail = "valid email is required";
        }
        if (account.password.length < 8) {
            newErrors.errPassword = "Password should atleast 8 character";
        }
        if (account.confirmPassword !== account.password) {
            newErrors.errConfirmPassword = "Passwords do not match";
        }
        if (Number(account.age) < 18 || Number(account.age) > 60) {
            newErrors.errAge = "age should be between 18 to 60";
        }
        setError(newErrors);
        if (Object.keys(newErrors).length === 0) {
            setSucess("Registered: " + account.name);
            setAccount(emptyAccount);
        }
        else {
            setSucess("");
        }
    };



    return (<form onSubmit={(e) => handleSubmit(e)} >

        <div>{sucess && <p style={{ color: "green" }}>{sucess}</p>}</div>
        <div><label>Name
            <input type="text" name="name" value={account.name} onChange={(e) => handleChange(e)} />
            {error.errName && <p style={{ color: "red" }}>{error.errName}</p>}
        </label></div>
        <div><label> email
            <input type="email" name="email" value={account.email} onChange={(e) => handleChange(e)} />
            {error.errEmail && <p style={{ color: "red" }} >{error.errEmail}</p>}
        </label></div>
        <div><label>password
            <input type="password" name="password" value={account.password} onChange={(e) => handleChange(e)} />
            {error.errPassword && <p style={{ color: "red" }}>{error.errPassword}</p>}
        </label></div>
        <div><label>confirm password
            <input type="password" name="confirmPassword" value={account.confirmPassword} onChange={(e) => handleChange(e)} />
            {error.errConfirmPassword && <p style={{ color: "red" }}>{error.errConfirmPassword}</p>}
        </label></div>
        <div><label> age
            <input type="number" name="age" value={account.age} onChange={(e) => handleChange(e)} />
            {error.errAge && <p style={{ color: "red" }} >{error.errAge} </p>}
        </label></div>
        <div>
            <button type="submit"> Register</button>
        </div>
    </form >);

};
export default RegisterDrill;