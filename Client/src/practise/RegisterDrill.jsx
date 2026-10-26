import { useState } from "react";

const emptyAccount = {
    name: "",
    email: "",
    password: "",
    age: ""
};


const RegisterDrill = () => {
    const [account, setAccount] = useState(emptyAccount);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccount({ ...account, [name]: value })
        console.log( account);
    };


    const handleSubmit = () => {
        e.preventDefault();
    };
    return (<form onSubmit={(e) => handleSubmit(e)} >
        <label>
            <p>Name
                <input type="text" name="name" value={account.name} onChange={(e) => handleChange(e)} />
            </p>
            <p> email
                <input type="email" name="email" value={account.email} onChange={(e) => handleChange(e)} />
            </p>
            <p>password
                <input type="password" name="password" value={account.password} onChange={(e) => handleChange(e)} />
            </p>
            <p> age
                <input type="number" name="age" min={18} max={60} value={account.age} onChange={(e) => handleChange(e)} />
            </p>
            <p>
                <button type="submit"> Register</button>
            </p>
        </label>
    </form >);

};
export default RegisterDrill;