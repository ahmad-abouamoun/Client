import {Ban} from "lucide-react";
import {useEffect, useState} from "react";
import DataTable from "react-data-table-component";

const ExperTable = () => {
    const [dataExperts, setDataExperts] = useState([]);
    const [form, setform] = useState(false);
    useEffect(() => {
        const getExperts = async () => {
            try {
                const response = await fetch("http://localhost:8080/users/experts", {
                    method: "GET",
                });
                const data = await response.json();
                setDataExperts(data);
            } catch (error) {
                console.error("Error fetching experts:", error);
            }
        };

        getExperts();
    }, []);
    const CreateExpert = async () => {};
    const columnsSpecialists = [
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: "Type",
            selector: (row) => row.type,
            sortable: true,
        },
        {
            name: "Banned",
            selector: (row) => (row.banned ? "Yes" : "No"),
        },
        {
            name: "Actions",
            cell: (row) => (
                <button className="ban-button">
                    <Ban />
                </button>
            ),
        },
    ];

    return (
        <div>
            <DataTable title="Specialist Management" columns={columnsSpecialists} data={dataExperts} highlightOnHover />
            <div className="createBtn">
                <button
                    onClick={() => {
                        setform(!form);
                    }}
                >
                    Create Expert
                </button>
            </div>
            {form && (
                <div className="createForm">
                    <h2>Create New Expert</h2>
                    <form>
                        <div className="formGroup">
                            <label>Name:</label>
                            <input type="text" name="name" required />
                        </div>
                        <div className="formGroup">
                            <label>Email:</label>
                            <input type="email" required />
                        </div>
                        <div className="formGroup">
                            <label>Password:</label>
                            <input type="password" required />
                        </div>
                        <div className="formGroup">
                            <label>Expert type:</label>
                            <select name="category" required>
                                <option value="coach">coach</option>
                                <option value="therapist">therapist</option>
                                <option value="nutritionist">nutritionist</option>
                            </select>
                        </div>
                        <div>
                            <label>Upload Course Material:</label>
                            <input type="file" name="courseMaterial" required />
                        </div>
                        <button type="submit" className="submitBtn">
                            Create Course
                        </button>
                        <button type="button" className="cancelBtn">
                            Cancel
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};
export default ExperTable;
