import { createContext, useEffect, useState } from "react"

const DataContext = createContext();

export function DataContextProvider({ children }) {
    const [doneLoading, setDoneLoading] = useState(false);
    const [token , setToken] = useState(localStorage.token);
    const header = (token)&&{'headers':{'Authorization':`Bearer ${token}`}};

    return(
        <DataContext.Provider value={{ doneLoading, setDoneLoading, token, setToken, header }}>
            { children }
        </DataContext.Provider>
    );
}

export default DataContext;