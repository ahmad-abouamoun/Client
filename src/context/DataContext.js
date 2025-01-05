import {useContext} from "react";
import {createContext} from "react";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setUser} from "../redux/userSlice";

const DataContext = createContext();
export const DataProvider = ({children}) => {
    const dispatch = useDispatch();
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
            } else {
                console.log("error");
            }
        };
        getUser();
    }, []);
    return <DataContext.Provider>{children}</DataContext.Provider>;
};
export const useData = () => useContext(DataContext);
