import DataTable from "react-data-table-component";

const ExperTable = () => {
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
            <DataTable
                title="Specialist Management"
                columns={columnsSpecialists}
                data={dataSpecialists}
                highlightOnHover
            />
        </div>
    );
};
export default ExperTable;
