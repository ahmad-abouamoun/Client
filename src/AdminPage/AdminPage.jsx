import React from "react";
import DataTable from "react-data-table-component";

const AdminPage = () => {
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
       
    );
};

export default AdminPage;
