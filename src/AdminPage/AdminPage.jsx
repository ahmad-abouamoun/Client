import React, {useEffect, useState} from "react";
import DataTable from "react-data-table-component";
import "./AdminPage.css";
import UserTable from "./UsersTable";
import ExperTable from "./ExpertsTable";
import image from "../Assets/Logo.png";
const AdminPage = () => {
    const [output, setOutput] = useState("specialists");

    return (
        <div>
            <nav className="nav">
                <img src={image} alt="" />
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
            </nav>
            <div className="table-container">{output === "users" ? <UserTable /> : <ExperTable />}</div>
        </div>
    );
};

export default AdminPage;
