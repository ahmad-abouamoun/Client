import React, {useState} from "react";
import "./createProgram.css";
const CreateProgram = ({show, handleClick}) => {
    const [name, setName] = useState("");
    const [trainingData, setTrainingData] = useState("");

    const [file, setFile] = useState(null);
    const token = sessionStorage.getItem("token");
    const fileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        } else {
            alert("Please select a file.");
        }
    };
    const CreateProgramApi = async () => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", name);
        formData.append("token", token);
        formData.append("training", trainingData);

        const response = await fetch("http://localhost:8080/programs", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        console.log(data);
    };
    const handleSubmit = (value) => {
        setName(value);
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
                            <h3>Name </h3>
                            <input
                                type="text"
                                placeholder="Name"
                                onChange={(e) => {
                                    handleSubmit(e.target.value);
                                }}
                            />
                            <br />
                            <br />
                            <textarea
                                className="textarea"
                                value={trainingData}
                                onChange={(e) => setTrainingData(e.target.value)}
                                placeholder="Example: deadLifts, pushups ..."
                                rows={6}
                                cols={37.5}
                            />
                            <div className="buttons">
                                <button className="container-btn-file">
                                    {file ? "Image Uploaded" : "Upload Image"}
                                    <input className="file" name="text" type="file" onChange={(e) => fileChange(e)} />
                                </button>
                                <button
                                    onClick={() => {
                                        CreateProgramApi();
                                        handleClick(!show);
                                    }}
                                >
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};
export default CreateProgram;
