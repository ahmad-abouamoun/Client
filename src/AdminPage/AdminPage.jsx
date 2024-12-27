import React, {useEffect, useState} from "react";
import DataTable from "react-data-table-component";
import NavBar from "../Re-usableComponents/NavBar/NavBar";
import "./AdminPage.css";
import UserTable from "./UsersTable";
const AdminPage = () => {
    const [output, setOutput] = useState("users");

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
            cell: (row) => <button>Click Me</button>,
        },
    ];

    const dataSpecialists = [
        {id: 1, name: "John Doe", email: "john@example.com", type: "coach", banned: false},
        {id: 2, name: "Jane Smith", email: "jane@example.com", type: "coach", banned: true},
        {id: 3, name: "Alice Johnson", email: "alice@example.com", type: "coach", banned: false},
    ];

    return (
        <div>
            <NavBar>
                <ul>
                    <li>
                        <span
                            onClick={() => {
                                setOutput("users");
                            }}
                        >
                            Users
                        </span>
                    </li>
                    <li>
                        <span
                            onClick={() => {
                                setOutput("specialists");
                            }}
                        >
                            Specialists
                        </span>
                    </li>
                </ul>
                <h3>Welcome Admin</h3>
            </NavBar>
            <div className="table-container">
                {output === "users" ? (
                    <UserTable />
                ) : (
                    <DataTable
                        title="Specialist Management"
                        columns={columnsSpecialists}
                        data={dataSpecialists}
                        highlightOnHover
                    />
                )}
            </div>
        </div>
    );
};

export default AdminPage;
