import React, {useState} from "react";
import {useForm} from "react-hook-form";

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
    const CreateProgram = async () => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("token", token);

        const response = await fetch("http://localhost:8080/programs", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        console.log(data);
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
                            <h3>Name: </h3>
                            <input type="text" placeholder="Name" {...register("name", {required: true})} />
                            <br />
                            <h3>Description: </h3>
                            <input type="text" placeholder="Name" {...register("description", {required: true})} />
                            <br />
                            <br />
                            <div>
                                <h3>Do you have Diabetes:</h3>
                                <label>
                                    <input name="diabetes" type="radio" value={true} />
                                    Yes
                                </label>
                                <label>
                                    <input name="diabetes" type="radio" value={false} />
                                    No
                                </label>
                            </div>
                            <div>
                                <h3>Do you have High Cholesterol:</h3>

                                <label>
                                    <input name="highCholesterol" type="radio" value={true} />
                                    Yes
                                </label>
                                <label>
                                    <input name="highCholesterol" type="radio" value={false} />
                                    No
                                </label>
                            </div>
                            <div>
                                <h3>Do you have Hypertension:</h3>

                                <label>
                                    <input name="hypertension" type="radio" value={true} />
                                    Yes
                                </label>
                                <label>
                                    <input name="hypertension" type="radio" value={false} />
                                    No
                                </label>
                            </div>

                            <h3>Upload an Image For the Program</h3>
                            <button className="container-btn-file">
                                {file ? "Image Uploaded" : "Upload Image"}
                                <input className="file" name="text" type="file" onChange={(e) => fileChange(e)} />
                            </button>
                            <button
                                onClick={() => {
                                    CreateProgram();
                                }}
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};
export default CreateFood;
