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
    const onSubmit = async (data) => {
        const input = {
            email: data.email,
            password: data.password,
        };
        console.log(input);
        try {
            const response = await fetch("http://localhost:8080/users/signin", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(input),
            });
            const responseData = await response.json();
            console.log(responseData);
        } catch (error) {
            console.error("Error during registration:", error);
            alert("An error occurred. Please try again.");
        }
    };
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
