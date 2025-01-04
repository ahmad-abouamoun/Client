import React, {useState} from "react";
import "./Login.css";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router";

const Login = () => {
    const navigate = useNavigate();
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
        try {
            const response = await fetch("http://localhost:8080/users/signin", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(input),
            });
            if (response.status === 400) {
                throw Error("Wrong email or password");
            }
            if (response.status === 401) {
                throw Error("User has Been Banned");
            }
            const data = await response.json();
            localStorage.setItem("token", data.token);
            navigate("/");
        } catch (error) {
            alert(error.message);
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
                        required
                        placeholder
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
                    Do not have an account?{" "}
                    <span
                        onClick={() => {
                            navigate("/SignUp");
                        }}
                    >
                        Register
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;
