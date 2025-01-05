import {useContext} from "react";
import {useState} from "react";
import {createContext} from "react";

const DataContext = createContext();
export const DataProvider = ({children}) => {
    const [loggedIn, setLoggedIn] = useState(false);

    return <DataContext.Provider value={{loggedIn, setLoggedIn}}>{children}</DataContext.Provider>;
};
export const useData = () => useContext(DataContext);
