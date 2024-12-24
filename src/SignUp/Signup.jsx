import React, {useState} from "react";
import "./Signup.css";
import {useForm} from "react-hook-form";

const Signup = () => {
    const {register, handleSubmit} = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });
    const [file, setFile] = useState(null);

    const onSubmit = async (data, e) => {
        e.preventDefault();
        const formData = new FormData();
        console.log(file.name);
        console.log(file.size);
        formData.append("file", file);
        formData.append("name", data.username);
        formData.append("email", data.email);
        formData.append("password", data.password);

        try {
            const response = await fetch("http://localhost:8080/programs/demo", {
                method: "POST",

                body: formData,
            });

            const data = await response.json();
        } catch (error) {
            console.error("Error during registration:", error);
            alert("An error occurred. Please try again.");
        }
    };

    const fileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div className="center">
            <form className="form" onSubmit={handleSubmit((data, e) => onSubmit(data, e))}>
                <p className="title">Register</p>
                <p className="message">Signup now and get full access to our app.</p>
                <label>
                    <input
                        {...register("username", {required: true})}
                        className="input"
                        type="text"
                        placeholder
                        required
                    />
                    <span>Firstname</span>
                </label>
                <label>
                    <input
                        {...register("email", {required: true})}
                        className="input"
                        type="text"
                        placeholder
                        required
                    />
                    <span>Email</span>
                </label>
                <label>
                    <input
                        {...register("password", {required: true})}
                        className="input"
                        type="password"
                        placeholder
                        required
                    />
                    <span>Password</span>
                </label>

                <button className="container-btn-file">
                    Upload File
                    <input
                        className="file"
                        name="text"
                        type="file"
                        onChange={(e) => {
                            fileChange(e);
                        }}
                    />
                </button>

                <button className="submit" type="submit">
                    Submit
                </button>
                <p className="signin">
                    Already have an account? <a href="#">Signin</a>
                </p>
            </form>
        </div>
    );
};

export default Signup;
