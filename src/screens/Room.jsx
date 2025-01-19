import React, {useEffect, useCallback, useState} from "react";
import ReactPlayer from "react-player";
import peer from "../service/peer";
import {useSocket} from "../context/SocketProvider";
import "./Room.css";

const Room = () => {
    const socket = useSocket();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [myStream, setMyStream] = useState();
    const [remoteStream, setRemoteStream] = useState();
    const [showChat, setShowChat] = useState(false);
    const [mute, setMute] = useState(true);
    const [remoteMute, setRemoteMute] = useState(true);

    const handleUserJoined = useCallback(({email, id}) => {
        console.log(`Email ${email} joined room`);
        setRemoteSocketId(id);
    }, []);
    const handleSendMessage = () => {
        if (newMessage.trim() === "") return;

        setMessages((prevMessages) => [...prevMessages, {sender: "Me", text: newMessage}]);

        socket.emit("send:message", {
            to: remoteSocketId,
            message: newMessage,
        });

        setNewMessage("");
    };
    const handleReceiveMessage = useCallback(({message}) => {
        setMessages((prevMessages) => [...prevMessages, {sender: "Other", text: message}]);
    }, []);
    const handleCallUser = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: mute,
            video: true,
        });
        const offer = await peer.getOffer();
        socket.emit("user:call", {to: remoteSocketId, offer});
        setMyStream(stream);
    }, [remoteSocketId, socket]);

    const handleIncommingCall = useCallback(
        async ({from, offer}) => {
            setRemoteSocketId(from);
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true,
            });
            setMyStream(stream);
            console.log(`Incoming Call`, from, offer);
            const ans = await peer.getAnswer(offer);
            socket.emit("call:accepted", {to: from, ans});
        },
        [socket]
    );

    const sendStreams = useCallback(() => {
        for (const track of myStream.getTracks()) {
            peer.peer.addTrack(track, myStream);
        }
    }, [myStream]);

    const handleCallAccepted = useCallback(
        ({from, ans}) => {
            peer.setLocalDescription(ans);
            console.log("Call Accepted!");
            sendStreams();
        },
        [sendStreams]
    );

    const handleNegoNeeded = useCallback(async () => {
        const offer = await peer.getOffer();
        socket.emit("peer:nego:needed", {offer, to: remoteSocketId});
    }, [remoteSocketId, socket]);

    useEffect(() => {
        peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
        return () => {
            peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
        };
    }, [handleNegoNeeded]);

    const handleNegoNeedIncomming = useCallback(
        async ({from, offer}) => {
            const ans = await peer.getAnswer(offer);
            socket.emit("peer:nego:done", {to: from, ans});
        },
        [socket]
    );

    const handleNegoNeedFinal = useCallback(async ({ans}) => {
        await peer.setLocalDescription(ans);
    }, []);

    useEffect(() => {
        peer.peer.addEventListener("track", async (ev) => {
            const remoteStream = ev.streams;
            console.log("GOT TRACKS!!");
            setRemoteStream(remoteStream[0]);
        });
    }, []);

    useEffect(() => {
        socket.on("user:joined", handleUserJoined);
        socket.on("incomming:call", handleIncommingCall);
        socket.on("call:accepted", handleCallAccepted);
        socket.on("peer:nego:needed", handleNegoNeedIncomming);
        socket.on("peer:nego:final", handleNegoNeedFinal);
        socket.on("receive:message", handleReceiveMessage);

        return () => {
            socket.off("user:joined", handleUserJoined);
            socket.off("incomming:call", handleIncommingCall);
            socket.off("call:accepted", handleCallAccepted);
            socket.off("peer:nego:needed", handleNegoNeedIncomming);
            socket.off("peer:nego:final", handleNegoNeedFinal);
            socket.off("receive:message", handleReceiveMessage);
        };
    }, [
        socket,
        handleUserJoined,
        handleIncommingCall,
        handleCallAccepted,
        handleNegoNeedIncomming,
        handleNegoNeedFinal,
        handleReceiveMessage,
    ]);

    return (
        <div className="room">
            <div className="details">
                <h1>Room Page</h1>
                <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4>
                {myStream && <button onClick={sendStreams}>Send Stream</button>}
                {remoteSocketId && <button onClick={handleCallUser}>CALL</button>}
            </div>
            <div>
                {showChat && (
                    <div className="room-container">
                        <button
                            className="close-room-container"
                            onClick={() => {
                                setShowChat(false);
                            }}
                        >
                            &times;
                        </button>
                        <div className="messages-area">
                            {messages.map((message, index) => (
                                <div key={index} className="message">
                                    <strong>{message.sender}:</strong> {message.text}
                                </div>
                            ))}
                        </div>
                        <div className="input-area">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button onClick={handleSendMessage}>Send</button>
                        </div>
                    </div>
                )}
            </div>
            <main>
                {myStream && (
                    <span>
                        <ReactPlayer muted={mute} playing height="400px" width="500px" url={myStream} />
                        <div className="mute-button">
                            <button
                                onClick={() => {
                                    setMute(!mute);
                                }}
                            >
                                {mute ? "Unmute" : "Mute"}
                            </button>
                        </div>
                        <button
                            className="chat-btn"
                            onClick={() => {
                                setShowChat(true);
                            }}
                        >
                            Messages
                        </button>
                    </span>
                )}
                {remoteStream && (
                    <p>
                        <ReactPlayer playing height="400px" muted={remoteMute} width="500px" url={remoteStream} />
                        <div className="mute-button">
                            <button
                                onClick={() => {
                                    setRemoteMute(!remoteMute);
                                }}
                            >
                                {remoteMute ? "Unmute" : "Mute"}
                            </button>
                        </div>
                    </p>
                )}
            </main>
        </div>
    );
};

export default Room;
