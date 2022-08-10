import { createContext, useState } from "react"

const DataContext = createContext();

export function DataContextProvider({ children }) {
    const [doneLoading, setDoneLoading] = useState(false);

    return(
        <DataContext.Provider value={{ doneLoading, setDoneLoading }}>
            { children }
        </DataContext.Provider>
    );
}

export default DataContext;