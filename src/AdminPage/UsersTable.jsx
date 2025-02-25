import {useEffect, useState} from "react";
import DataTable from "react-data-table-component";
import {Ban} from "lucide-react";

const UserTable = () => {
    const [dataUsers, setDataUsers] = useState([]);
    const BanUser = async (id) => {
        setDataUsers(
            dataUsers.map((user) => {
                return user._id === id ? {...user, banned: true} : user;
            })
        );
        const response = await fetch(`http://localhost:8000/users/${id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                token: sessionStorage.getItem("token"),
            }),
        });
        const data = await response.json();
        console.log(data);
    };
    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await fetch("http://localhost:8000/users/", {
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
                    className="ban-button"
                    onClick={() => {
                        BanUser(row._id);
                    }}
                >
                    Ban
                </button>
            ),
        },
    ];

    return (
        <div>
            <h2>User Management</h2>
            <DataTable columns={columnsUsers} data={dataUsers} highlightOnHover />
        </div>
    );
};
export default UserTable;
