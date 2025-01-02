import React, {useState} from "react";
import {useForm} from "react-hook-form";
import "./CreateFood.css";
const CreateFood = ({show, handleClick}) => {
    const {register, handleSubmit} = useForm({
        defaultValues: {
            name: "",
            description: "",
            diabetes: false,
            highCholesterol: false,
            hypertension: false,
        },
    });
    const [file, setFile] = useState(null);
    const token = localStorage.getItem("token");
    const fileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        } else {
            alert("Please select a file.");
        }
    };
    const onSubmit = async (data) => {
        const diseases = {
            diabetes: data.diabetes,
            highCholesterol: data.highCholesterol,
            hypertension: data.hypertension,
        };
        const stringfiedDiseases = JSON.stringify(diseases);
        const formData = new FormData();
        formData.append("filename", file);
        formData.append("token", token);
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("diseases", stringfiedDiseases);
        const response = await fetch("http://localhost:8080/food", {
            method: "POST",
            body: formData,
        });
        const result = await response.json();
        console.log(result);
    };

    return (
        show && (
            <div>
                <div className="popup-overlay">
                    <div className="popup">
                        <button onClick={() => handleClick(!show)} className="close-popup">
                            &times;
                        </button>
                        <div className="popup-content">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h3>Name: </h3>
                                <input type="text" placeholder="Name" {...register("name", {required: true})} />
                                <br />
                                <h3>Description: </h3>
                                <input
                                    type="text"
                                    placeholder="Description"
                                    {...register("description", {required: true})}
                                />
                                <br />
                                <br />
                                <div>
                                    <h3>Does it affect people with Diabetes:</h3>
                                    <label>
                                        <input {...register("diabetes", {required: true})} type="radio" value={true} />
                                        Yes
                                    </label>
                                    <label>
                                        <input {...register("diabetes", {required: true})} type="radio" value={false} />
                                        No
                                    </label>
                                </div>
                                <div>
                                    <h3>Does it affect people with High Cholesterol:</h3>

                                    <label>
                                        <input
                                            {...register("highCholesterol", {required: true})}
                                            type="radio"
                                            value={true}
                                        />
                                        Yes
                                    </label>
                                    <label>
                                        <input
                                            {...register("highCholesterol", {required: true})}
                                            type="radio"
                                            value={false}
                                        />
                                        No
                                    </label>
                                </div>
                                <div>
                                    <h3>Does it affect people with Hypertension:</h3>

                                    <label>
                                        <input
                                            {...register("hypertension", {required: true})}
                                            type="radio"
                                            value={true}
                                        />
                                        Yes
                                    </label>
                                    <label>
                                        <input
                                            {...register("hypertension", {required: true})}
                                            type="radio"
                                            value={false}
                                        />
                                        No
                                    </label>
                                </div>

                                <h3>Upload an Image For the Program</h3>
                                <button className="container-btn-file">
                                    {file ? "Image Uploaded" : "Upload Image"}
                                    <input className="file" name="text" type="file" onChange={(e) => fileChange(e)} />
                                </button>
                                <button type="submit">Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};
export default CreateFood;
