import React, {useState} from "react";
import "./Login.css";
import {useForm} from "react-hook-form";

const Login = () => {
    const {register, handleSubmit} = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    return (
        <div className="center">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <p className="title">Login</p>
                <p className="message">Login now and get full access to our app.</p>

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

                <button className="submit" type="submit">
                    Submit
                </button>
                <p className="signin">
                    Do not have an account? <a href="#">Signup</a>
                </p>
            </form>
        </div>
    );
};

export default Login;
