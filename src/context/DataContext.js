import { createContext, useState } from "react"

const DataContext = createContext();

export function DataContextProvider({ children }) {
    const [contextData , setContextData] = useState(null);
    const [logout, setLogout] = useState(false);

    return(
        <DataContext.Provider value={{ logout, setLogout, contextData, setContextData }}>
            { children }
        </DataContext.Provider>
    );
}

export default DataContext;