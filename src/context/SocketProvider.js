import {useContext, useMemo, useState} from "react";
import {createContext} from "react";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setUser} from "../redux/userSlice";
import {io} from "socket.io-client";

const SocketContext = createContext(null);
export const SocketProvider = ({children}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getUser = async () => {
            const token = sessionStorage.getItem("token");
            if (token) {
                try {
                    const response = await fetch("http://localhost:8000/users/getUser", {
                        headers: {
                            token,
                            "Content-Type": "application/json",
                        },
                        method: "GET",
                    });
                    const responseDate = await response.json();
                    dispatch(setUser(responseDate));
                } catch (error) {
                    console.log(error.message);
                }
            }
        };
        getUser();
    }, []);
    const socket = useMemo(() => io("localhost:8080"), []);

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
export const useSocket = () => {
    const socket = useContext(SocketContext);
    return socket;
};
