import {useContext, useState} from "react";
import {createContext} from "react";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setUser} from "../redux/userSlice";

const DataContext = createContext();
export const DataProvider = ({children}) => {
    const dispatch = useDispatch();
    const [showCalendar, setShowCalendar] = useState(false);
    const handleCalendar = () => {
        setShowCalendar(!showCalendar);
    };
    useEffect(() => {
        const getUser = async () => {
            const token = sessionStorage.getItem("token");
            if (token) {
                try {
                    const response = await fetch("http://localhost:8080/users/getUser", {
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
    return <DataContext.Provider value={(showCalendar, handleCalendar)}>{children}</DataContext.Provider>;
};
export const useData = () => useContext(DataContext);
