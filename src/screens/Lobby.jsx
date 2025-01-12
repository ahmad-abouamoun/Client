import React, {useState, useEffect} from "react";
import NavBar from "../Re-usableComponents/NavBar/NavBar";

import {useNavigate} from "react-router-dom";
import {useSocket} from "../context/SocketProvider";
import {useSelector} from "react-redux";
import "./Lobby.css";
import Meeting from "./Meeting";
const Lobby = () => {
    const user = useSelector((state) => state.users.user);
    const email = user.email;
    const token = sessionStorage.getItem("token");
    const [room, setRoom] = useState("101");
    const [meetings, setMeetings] = useState([]);
    const socket = useSocket();
    const navigate = useNavigate();

    const handleJoinMeeting = (e) => {
        e.preventDefault();
        if (!email || !room) {
            alert("Please enter your email and room ID to join the meeting.");
            return;
        }
        socket.emit("room:join", {email, room});
    };

    const handleJoinRoom = (data) => {
        const {room} = data;
        navigate(`/room/${room}`);
    };

    useEffect(() => {
        socket.on("room:join", handleJoinRoom);

        return () => {
            socket.off("room:join", handleJoinRoom);
        };
    }, [socket]);

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
            <Meeting />
        </div>
    );
};

export default Lobby;
