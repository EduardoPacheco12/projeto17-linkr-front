import { createContext, useState } from "react"

const DataContext = createContext();

export function DataContextProvider({ children }) {
    const [contextData , setContextData] = useState(null);

    return(
        <DataContext.Provider value={{ contextData, setContextData }}>
            { children }
        </DataContext.Provider>
    );
}

export default DataContext;