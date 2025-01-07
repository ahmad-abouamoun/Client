import React, {useEffect, useCallback, useState} from "react";
import ReactPlayer from "react-player";
import peer from "../service/peer";
import {useSocket} from "../context/SocketProvider";

const Room = () => {
    const socket = useSocket();
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [myStream, setMyStream] = useState();
    const [remoteStream, setRemoteStream] = useState();

    const handleUserJoined = useCallback(({email, id}) => {
        console.log(`Email ${email} joined room`);
        setRemoteSocketId(id);
    }, []);

    const handleCallUser = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });
        const offer = await peer.getOffer();
        socket.emit("user:call", {to: remoteSocketId, offer});
        setMyStream(stream);
    }, [remoteSocketId, socket]);

    return (
        <div>
            <h1>Room Page</h1>
            <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4>
            {myStream && <button>Send Stream</button>}
            {remoteSocketId && <button onClick={handleCallUser}>CALL</button>}
            {myStream && (
                <>
                    <h1>My Stream</h1>
                    <ReactPlayer playing height="500px" width="600px" url={myStream} />
                </>
            )}
            {remoteStream && (
                <>
                    <h1>Remote Stream</h1>
                    <ReactPlayer playing height="500px" width="600px" url={remoteStream} />
                </>
            )}
        </div>
    );
};

export default Room;
