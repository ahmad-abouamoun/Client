import {Ban} from "lucide-react";
import React from "react";
import {useEffect, useState} from "react";
import DataTable from "react-data-table-component";
import {useForm} from "react-hook-form";

const ExperTable = () => {
    const [dataExperts, setDataExperts] = useState([]);
    const [formView, setformView] = useState(false);
    const [file, setFile] = useState(null);

    const fileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };
    const {register, handleSubmit} = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            type: "coach",
        },
    });
    const onSubmit = async (data) => {
        const formData = new FormData();

        const diseases = {
            diabetes: false,
            highCholesterol: false,
            hypertension: false,
        };

        formData.append("file", file);
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("type", data.type);
        formData.append("diseases", JSON.stringify(diseases));
        try {
            const response = await fetch("http://localhost:8000/users", {
                method: "POST",
                body: formData,
            });
            if (response.status === 401) {
                throw Error("account already exists");
            }
            setformView(!formView);
            const responseData = await response.json();
        } catch (error) {
            alert(error.message);
        }
    };
    useEffect(() => {
        const getExperts = async () => {
            try {
                const response = await fetch("http://localhost:8000/users/experts", {
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
    const DeleteUser = async (id) => {
        setDataExperts((prevDataExperts) => prevDataExperts.filter((user) => user._id !== id));
        const response = await fetch(`http://localhost:8000/users/${id}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                token: sessionStorage.getItem("token"),
            }),
        });
        const data = await response.json();
    };

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
                <button
                    onClick={() => {
                        DeleteUser(row._id);
                    }}
                    className="ban-button"
                >
                    Delete
                </button>
            ),
        },
    ];

    return (
        <div>
            <div className="table-title">
                <div>
                    <h2>Specialists Managment</h2>
                    <div className="createBtn">
                        <button
                            onClick={() => {
                                setformView(!formView);
                            }}
                        >
                            Create Expert
                        </button>
                    </div>
                </div>
                <DataTable columns={columnsSpecialists} data={dataExperts} highlightOnHover />
            </div>
            {formView && (
                <div className="createForm">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="formGroup">
                            <label>Name</label>
                            <br />
                            <input
                                className="input-create"
                                type="text"
                                name="name"
                                {...register("name", {required: true})}
                            />
                        </div>
                        <div className="formGroup">
                            <label>Email</label>
                            <br />
                            <input className="input-create" type="email" {...register("email", {required: true})} />
                        </div>
                        <div className="formGroup">
                            <label>Password</label>
                            <br />
                            <input
                                className="input-create"
                                type="password"
                                {...register("password", {required: true})}
                            />
                        </div>
                        <div className="formGroup">
                            <label>Expert type</label>
                            <br />
                            <select name="type" {...register("type", {required: true})}>
                                <option value="coach">coach</option>
                                <option value="therapist">therapist</option>
                                <option value="nutritionist">nutritionist</option>
                            </select>
                        </div>
                        <div>
                            <button className="container-btn-file">
                                Upload
                                <input className="file" name="text" type="file" onChange={(e) => fileChange(e)} />
                            </button>
                        </div>
                        <div className="actionBtn">
                            <button
                                onClick={() => {
                                    setformView(!formView);
                                }}
                                className="cancelBtn"
                            >
                                Cancel
                            </button>
                            <button type="submit" className="submitBtn">
                                Create Expert
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};
export default ExperTable;
