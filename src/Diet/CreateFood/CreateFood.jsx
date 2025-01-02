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
        const formData = new FormData();
        formData.append("file", file);
        formData.append("token", token);

        console.log(data.name);
        console.log(data.description);
        console.log(data.highCholesterol);
        console.log(data.diabetes);
        console.log(data.hypertension);
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
                                    <h3>Do you have Diabetes:</h3>
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
                                    <h3>Do you have High Cholesterol:</h3>

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
                                    <h3>Do you have Hypertension:</h3>

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
