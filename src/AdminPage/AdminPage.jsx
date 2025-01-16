import React, {useEffect, useState} from "react";
import DataTable from "react-data-table-component";
import "./AdminPage.css";
import UserTable from "./UsersTable";
import ExperTable from "./ExpertsTable";
import image from "../Assets/Logo.png";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";
const AdminPage = () => {
    const navigate = useNavigate();
    const [output, setOutput] = useState("specialists");
    const user = useSelector((state) => state.users.user);
    if (user.type !== "admin") {
        navigate("/");
    }
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
                <button
                    onClick={() => {
                        sessionStorage.removeItem("token");
                        navigate("/login");
                    }}
                >
                    Logout
                </button>
            </nav>
            <div className="table-container">{output === "users" ? <UserTable /> : <ExperTable />}</div>
        </div>
    );
};

export default AdminPage;
