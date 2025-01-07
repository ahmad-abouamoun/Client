import React, {useEffect, useCallback, useState} from "react";
import ReactPlayer from "react-player";
import peer from "../service/peer";
import {useSocket} from "../context/SocketProvider";

const Room = () => {
    const socket = useSocket();
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [myStream, setMyStream] = useState();
    const [remoteStream, setRemoteStream] = useState();

    return (
        <div>
            <h1>Room Page</h1>
            <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4>
            {myStream && <button>Send Stream</button>}
            {remoteSocketId && <button>CALL</button>}
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
