import { createContext, useEffect, useState } from "react"

const DataContext = createContext();

export function DataContextProvider({ children }) {
    const [contextData , setContextData] = useState(null);
    const [logout, setLogout] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if(userData === null) {
            const data = localStorage.getItem('linkrToken')
            setUserData(JSON.parse(data));
        }
    }, [userData])

    return(
        <DataContext.Provider value={{ logout, setLogout, contextData, setContextData, userData, setUserData }}>
            { children }
        </DataContext.Provider>
    );
}

export default DataContext;