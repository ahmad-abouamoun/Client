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
            <form className="form" onSubmit={handleSubmit(onSubmit)}></form>
        </div>
    );
};

export default Login;
