import React, {useState, useCallback, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSocket} from "../context/SocketProvider";
import {useSelector} from "react-redux";
import "./Lobby.css";
const Lobby = () => {
    const user = useSelector((state) => state.users.user);
    const email = user.email;
    const [room, setRoom] = useState("");

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
            <div class="lobby">
                <h1>Lobby</h1>
                <form onSubmit={handleSubmitForm}>
                    <label htmlFor="room">Room Number</label>
                    <input type="text" id="room" value={room} onChange={(e) => setRoom(e.target.value)} />
                    <br />
                    <button>Join</button>
                </form>
            </div>
        </div>
    );
};

export default Lobby;
