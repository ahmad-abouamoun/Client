import React, {useState, useEffect, useCallback} from "react";
import NavBar from "../Re-usableComponents/NavBar/NavBar";
import "./Meeting.css";

import {useNavigate} from "react-router-dom";
import {useSocket} from "../context/SocketProvider";
import {useSelector} from "react-redux";
import "./Lobby.css";
const Lobby = () => {
    const user = useSelector((state) => state.users.user);
    const email = user.email;
    const [room, setRoom] = useState("101");
    const token = sessionStorage.getItem("token");
    const [meetings, setMeetings] = useState([]);
    const socket = useSocket();
    const navigate = useNavigate();

    const handleSubmitForm = useCallback(
        (e) => {
            e.preventDefault();
            socket.emit("room:join", {email, room});
        },
        [email, room, socket]
    );

    const handleJoinRoom = useCallback(
        (data) => {
            const {email, room} = data;
            navigate(`/room/${room}`);
        },
        [navigate]
    );

    useEffect(() => {
        socket.on("room:join", handleJoinRoom);
        return () => {
            socket.off("room:join", handleJoinRoom);
        };
    }, [socket, handleJoinRoom]);

    useEffect(() => {
        const getMeetings = async () => {
            const response = await fetch("http://localhost:8080/meetings", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    token,
                },
            });
            const data = await response.json();
            setMeetings(data);
        };
        getMeetings();
    }, []);

    return (
        <div className="view">
            <NavBar />
            {meetings.map((meeting) => (
                <form className="meeting-container" onSubmit={handleSubmitForm}>
                    <div>
                        <h3>Hello there</h3>
                        <button className="join-button">Enroll Now</button>
                    </div>
                </form>
            ))}
        </div>
    );
};

export default Lobby;
