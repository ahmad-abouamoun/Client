import React from "react";
import "./Signup.css";
const Signup = () => {
    return (
        <div className="center">
            <form className="form">
                <p className="title">Register </p>
                <p className="message">Signup now and get full access to our app. </p>
                <label>
                    <input className="input" type="text" placeholder required />
                    <span>UserName</span>
                </label>

                <button className="submit">Submit</button>
            </form>
        </div>
    );
};

export default Signup;
