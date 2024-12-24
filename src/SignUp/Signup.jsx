import React from "react";
import "./Signup.css";
import {useForm} from "react-hook-form";
const Signup = () => {
    const {register, handleSubmit} = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
            file: "",
        },
    });

    return (
        <div className="center">
            <form className="form">
                <p className="title">Register </p>
                <p className="message">Signup now and get full access to our app. </p>
                <label>
                    <input className="input" type="text" placeholder required />
                    <span>Firstname</span>
                </label>
                <label>
                    <input className="input" type="text" placeholder required />
                    <span>Email</span>
                </label>
                <label>
                    <input className="input" type="password" placeholder required />
                    <span>Password</span>
                </label>

                <button class="container-btn-file">
                    Upload File
                    <input class="file" name="text" type="file" />
                </button>

                <button className="submit" type="submit">
                    Submit
                </button>
                <p className="signin">
                    Already have an acount ? <a href="#">Signin</a>
                </p>
            </form>
        </div>
    );
};

export default Signup;
