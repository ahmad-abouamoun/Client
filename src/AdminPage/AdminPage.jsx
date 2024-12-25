import React, {useEffect, useState} from "react";
import DataTable from "react-data-table-component";
import NavBar from "../Re-usableComponents/NavBar/NavBar";
import "./AdminPage.css";
const AdminPage = () => {
    const [output, setOutput] = useState("users");

    const columns = [
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
            name: "Banned",
            selector: (row) => (row.banned ? "Yes" : "No"),
        },
        {
            name: "Actions",
            cell: (row) => <button>Click Me</button>,
        },
    ];

    const data = [
        {id: 1, name: "John Doe", email: "john@example.com", banned: false},
        {id: 2, name: "Jane Smith", email: "jane@example.com", banned: true},
        {id: 3, name: "Alice Johnson", email: "alice@example.com", banned: false},
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
            <div>
                <DataTable title="User Management" columns={columns} data={data} highlightOnHover />
            </div>
        </div>
    );
};

export default AdminPage;
