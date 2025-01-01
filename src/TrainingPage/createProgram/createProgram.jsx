import React, {useState} from "react";

const CreateProgram = ({show, handleClick}) => {
    const [name, setName] = useState("");
    const [file, setFile] = useState(null);
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
        formData.append("name", name);
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
                            <h3>Name: </h3>
                            <input
                                type="text"
                                placeholder="Name"
                                onChange={(e) => {
                                    handleSubmit(e.target.value);
                                }}
                            />
                            <br />
                            <br />

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
export default CreateProgram;
