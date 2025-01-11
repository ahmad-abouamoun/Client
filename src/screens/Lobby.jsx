import React, {useState, useCallback, useEffect} from "react";
import NavBar from "../Re-usableComponents/NavBar/NavBar";

import {useNavigate} from "react-router-dom";
import {useSocket} from "../context/SocketProvider";
import {useSelector} from "react-redux";
import "./Lobby.css";
const Lobby = () => {
    const user = useSelector((state) => state.users.user);
    const email = user.email;
    const [room, setRoom] = useState("101");

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

    return (
        <div className="view">
            <NavBar />
        </div>
    );
};

export default Lobby;
