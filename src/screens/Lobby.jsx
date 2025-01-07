import React, {useState, useCallback, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSocket} from "../context/SocketProvider";
import {useSelector} from "react-redux";

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

    return (
        <div>
            <h1>Lobby</h1>
            <form onSubmit={handleSubmitForm}>
                <label htmlFor="room">Room Number</label>
                <input type="text" id="room" value={room} onChange={(e) => setRoom(e.target.value)} />
                <br />
                <button>Join</button>
            </form>
        </div>
    );
};

export default Lobby;
