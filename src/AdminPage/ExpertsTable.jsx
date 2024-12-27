import {Ban} from "lucide-react";
import {useEffect, useState} from "react";
import DataTable from "react-data-table-component";

const ExperTable = () => {
    const [dataExperts, setDataExperts] = useState([]);

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
                <button>Create Expert</button>
            </div>
        </div>
    );
};
export default ExperTable;
