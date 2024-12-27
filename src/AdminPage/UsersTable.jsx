import {useEffect, useState} from "react";
import DataTable from "react-data-table-component";
import {Ban} from "lucide-react";

const UserTable = () => {
    const [dataUsers, setDataUsers] = useState([]);
    const BanUser = async (row) => {
        console.log(row);
    };
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
                <button
                    onClick={() => {
                        BanUser(row._id);
                    }}
                >
                    <Ban />
                </button>
            ),
        },
    ];

    return (
        <div>
            <DataTable title="User Management" columns={columnsUsers} data={dataUsers} highlightOnHover />
        </div>
    );
};
export default UserTable;
