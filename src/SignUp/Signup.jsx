import React, {useState} from "react";
import "./Signup.css";
import {useForm} from "react-hook-form";

const Signup = () => {
    const {register, handleSubmit} = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });
    const [file, setFile] = useState(null);

    const onSubmit = async (data) => {
        if (!file) {
            alert("Please upload a file before submitting.");
            return;
        }

        const formData = new FormData();

        const diseases = {
            diabetes: true,
            highCholesterol: true,
            hypertension: true,
        };

        formData.append("file", file);
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("type", "user");
        formData.append("diseases", JSON.stringify(diseases));

        try {
            const response = await fetch("http://localhost:8080/users", {
                method: "POST",
                body: formData,
            });

            const responseData = await response.json();
        } catch (error) {
            console.error("Error during registration:", error);
            alert("An error occurred. Please try again.");
        }
    };

    const fileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        } else {
            alert("Please select a file.");
        }
    };

    return (
        <div className="center">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <p className="title">Register</p>
                <p className="message">Signup now and get full access to our app.</p>
                <label>
                    <input {...register("name", {required: true})} className="input" type="text" placeholder required />
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
                    <input className="file" name="text" type="file" onChange={(e) => fileChange(e)} />
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
