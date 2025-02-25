import React, {useState} from "react";
import "./Signup.css";
import "./QuestionForm.css";
import useForm from "../hooks/useForm.js";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {setUser} from "../redux/userSlice.js";
const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {form, updateForm} = useForm({
        name: "",
        email: "",
        password: "",
        diabetes: false,
        highCholesterol: false,
        hypertension: false,
    });

    const [number, setNumber] = useState(1);
    const [file, setFile] = useState(null);

    const onSubmit = async () => {
        if (!file) {
            alert("Please upload a file before submitting.");
            return;
        }

        const formData = new FormData();

        const diseases = {
            diabetes: form.diabetes,
            highCholesterol: form.highCholesterol,
            hypertension: form.hypertension,
        };
        formData.append("file", file);
        formData.append("name", form.name);
        formData.append("email", form.email);
        formData.append("password", form.password);
        formData.append("diseases", JSON.stringify(diseases));
        try {
            const response = await fetch("http://localhost:8000/users", {
                method: "POST",
                body: formData,
            });
            if (response.status === 400) {
                throw Error("please enter all fields");
            } else if (response.status === 401) {
                throw Error("email already registered");
            } else if (response.status === 500) {
                throw Error("an error occured in db");
            }
            const responseData = await response.json();
            dispatch(setUser(responseData.data));
            sessionStorage.setItem("token", responseData.token);
            navigate("/");
        } catch (error) {
            alert(error.message);
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
            {number === 1 && (
                <div className="form">
                    <p className="title">Register</p>
                    <p className="message">Signup now and get full access to our app.</p>
                    <label>
                        <input onChange={updateForm} name="name" className="input" type="text" placeholder required />
                        <span>Name</span>
                    </label>
                    <label>
                        <input onChange={updateForm} name="email" className="input" type="text" placeholder required />
                        <span>Email</span>
                    </label>
                    <label>
                        <input
                            onChange={updateForm}
                            name="password"
                            className="input"
                            type="password"
                            placeholder
                            required
                        />
                        <span>Password</span>
                    </label>

                    <button className="container-btn-file">
                        Upload Image
                        <input className="file" name="text" type="file" onChange={(e) => fileChange(e)} />
                    </button>

                    <button className="submit" onClick={() => setNumber(2)}>
                        Submit
                    </button>
                    <p className="signin">
                        Already have an account?{" "}
                        <span
                            onClick={() => {
                                navigate("/Login");
                            }}
                        >
                            Login
                        </span>
                    </p>
                </div>
            )}
            {number === 2 && (
                <div className="questionnaire-container">
                    <div className="overlay">
                        <div className="questionnaire-content">
                            <h2>Just a couple of questions before creating your account</h2>
                            <main>
                                <p>Do you have highCholesterol?</p>
                                <div className="options">
                                    <label>
                                        <span>.</span>
                                        <input onChange={updateForm} name="highCholesterol" type="radio" value={true} />
                                        Yes
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            onChange={updateForm}
                                            name="highCholesterol"
                                            value={false}
                                        />
                                        No
                                    </label>
                                </div>
                            </main>
                            <button className="next-button" onClick={() => setNumber(3)}>
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {number === 3 && (
                <div className="questionnaire-container">
                    <div className="overlay">
                        <div className="questionnaire-content">
                            <h2>Just a couple of questions before creating your account</h2>
                            <main>
                                <p>Do you have hypertension?</p>
                                <div className="options">
                                    <label>
                                        <span>.</span>
                                        <input onChange={updateForm} name="hypertension" type="radio" value={true} />
                                        Yes
                                    </label>
                                    <label>
                                        <input type="radio" onChange={updateForm} name="hypertension" value={false} />
                                        No
                                    </label>
                                </div>
                            </main>
                            <button className="next-button" onClick={() => setNumber(4)}>
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {number === 4 && (
                <div className="questionnaire-container">
                    <div className="overlay">
                        <div className="questionnaire-content">
                            <h2>Just a couple of questions before creating your account</h2>
                            <main>
                                <p>Do you have Diabetes?</p>
                                <div className="options">
                                    <label>
                                        <span>.</span>
                                        <input onChange={updateForm} name="diabetes" type="radio" value={true} />
                                        Yes
                                    </label>
                                    <label>
                                        <input type="radio" onChange={updateForm} name="diabetes" value={false} />
                                        No
                                    </label>
                                </div>
                            </main>
                            <button className="next-button" onClick={() => onSubmit()}>
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Signup;
