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
                            <button className="container-btn-file">
                                {file ? "Image Uploaded" : "Upload Image"}
                                <input className="file" name="text" type="file" onChange={(e) => fileChange(e)} />
                            </button>
                            <br />
                            <button>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};
export default CreateProgram;
