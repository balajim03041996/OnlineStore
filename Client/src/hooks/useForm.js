import { useState } from "react";


const useForm = (initialValues) => {
    const [values, setValue] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValue({ ...values, [name]: value });
    }
    const reset = () => {
        setValue(initialValues);
    };

    return { valuesUF: values, handleChangeUF: handleChange, resetUF: reset };

};
export default useForm;