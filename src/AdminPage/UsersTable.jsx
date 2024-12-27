import {useEffect, useState} from "react";
import DataTable from "react-data-table-component";
import {Ban} from "lucide-react";

const UserTable = () => {
    const [dataUsers, setDataUsers] = useState();
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
            cell: (row) => (
                <button>
                    <Ban />
                </button>
            ),
        },
    ];
    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await fetch("http://localhost:8080/users/", {
                    method: "GET",
                });
                const data = await response.json();
                setDataUsers(data);
            } catch (error) {
                console.error("Error fetching experts:", error);
            }
        };

        getUsers();
    }, []);
    return (
        <div>
            <DataTable title="User Management" columns={columnsUsers} data={dataUsers} highlightOnHover />
        </div>
    );
};
export default UserTable;
