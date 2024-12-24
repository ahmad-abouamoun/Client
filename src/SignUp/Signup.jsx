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
    const [file, setFile] = useState();
    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="center">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <p className="title">Register </p>
                <p className="message">Signup now and get full access to our app. </p>
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
                    <input className="file" name="text" type="file" />
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
