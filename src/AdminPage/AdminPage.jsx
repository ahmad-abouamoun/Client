import React, {useEffect, useState} from "react";
import DataTable from "react-data-table-component";
import NavBar from "../Re-usableComponents/NavBar/NavBar";
import "./AdminPage.css";
import UserTable from "./UsersTable";
import ExperTable from "./ExpertsTable";
const AdminPage = () => {
    const [output, setOutput] = useState("users");

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
            <div className="table-container">{output === "users" ? <UserTable /> : <ExperTable />}</div>
        </div>
    );
};

export default AdminPage;
