import {useEffect} from "react";
import DataTable from "react-data-table-component";

const UserTable = () => {
    const columnsUsers = [
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
    useEffect(() => {
        const getExperts = async () => {
            const response = await fetch("http://localhost:8080/users/experts", {
                method: "GET",
            });
            const data = await response.json();
        };
        getExperts();
    }, []);
    const dataUsers = [
        {id: 1, name: "John Doe", email: "john@example.com", banned: false},
        {id: 2, name: "Jane Smith", email: "jane@example.com", banned: true},
        {id: 3, name: "Alice Johnson", email: "alice@example.com", banned: false},
    ];
    return (
        <div>
            {" "}
            <DataTable title="User Management" columns={columnsUsers} data={dataUsers} highlightOnHover />
        </div>
    );
};
export default UserTable;
