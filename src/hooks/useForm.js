import {useState} from "react";

const useForm = (initialValues) => {
    const [form, setForm] = useState(initialValues);

    const updateForm = (e) => {
        const {name, value} = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
        console.log(form);
    };

    return {form, updateForm};
};

export default useForm;
