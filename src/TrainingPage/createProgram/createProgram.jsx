import React, {useState} from "react";
import "./createProgram.css";

const CreateProgram = ({show, handleClick}) => {
    const [name, setName] = useState("");
    const [trainings, setTrainings] = useState([]);
    const [currentWorkout, setCurrentWorkout] = useState("");
    const [currentReps, setCurrentReps] = useState("");
    const [currentSets, setCurrentSets] = useState("");
    const [file, setFile] = useState(null);
    const token = sessionStorage.getItem("token");

    const Workouts = ["ChinUp", "PullUp", "PushUp", "KneePushUp"];
    const reps = ["1", "2", "3", "4", "5", "6", "7", "8"];
    const sets = ["1", "2", "3", "4"];

    const fileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        } else {
            alert("Please select a file.");
        }
    };

    const handleAddTraining = () => {
        if (!currentWorkout || !currentReps || !currentSets) {
            alert("Please select a workout, reps, and sets.");
            return;
        }

        const newTraining = `${currentWorkout}: ${currentReps} reps: ${currentSets} sets`;
        setTrainings([...trainings, newTraining]);

        setCurrentWorkout("");
        setCurrentReps("");
        setCurrentSets("");
    };

    const handleRemoveTraining = (index) => {
        setTrainings(trainings.filter((_, i) => i !== index));
    };

    const CreateProgramApi = async () => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", name);
        formData.append("token", token);
        formData.append("training", trainings.join(","));

        const response = await fetch("http://localhost:8000/programs", {
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
                            <h3>Name</h3>
                            <input
                                type="text"
                                placeholder="Program Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <br />
                            <br />

                            <div className="training-selection">
                                <select value={currentWorkout} onChange={(e) => setCurrentWorkout(e.target.value)}>
                                    <option value="" disabled>
                                        Select Workout
                                    </option>
                                    {Workouts.map((workout) => (
                                        <option key={workout} value={workout}>
                                            {workout}
                                        </option>
                                    ))}
                                </select>
                                <select value={currentReps} onChange={(e) => setCurrentReps(e.target.value)}>
                                    <option value="" disabled>
                                        Select Reps
                                    </option>
                                    {reps.map((rep) => (
                                        <option key={rep} value={rep}>
                                            {rep}
                                        </option>
                                    ))}
                                </select>
                                <select value={currentSets} onChange={(e) => setCurrentSets(e.target.value)}>
                                    <option value="" disabled>
                                        Select Sets
                                    </option>
                                    {sets.map((set) => (
                                        <option key={set} value={set}>
                                            {set}
                                        </option>
                                    ))}
                                </select>
                                <button onClick={handleAddTraining}>Add Training</button>
                            </div>

                            <div className="training-list">
                                <h4>Added Trainings:</h4>
                                {trainings.length > 0 ? (
                                    trainings.map((training, index) => (
                                        <div key={index} className="training-item">
                                            <span>{training}</span>
                                            <button onClick={() => handleRemoveTraining(index)}>Remove</button>
                                        </div>
                                    ))
                                ) : (
                                    <p>No trainings added yet.</p>
                                )}
                            </div>
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
