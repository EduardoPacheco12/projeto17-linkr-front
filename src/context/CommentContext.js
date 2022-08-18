import { createContext, useState } from "react";

const CommentContext = createContext();

export function CommentContextProvider({ children }) {
    const [ dataComments, setDataComments ] = useState([]);
    return(
        <CommentContext.Provider value={{ dataComments, setDataComments }}>
            { children }
        </CommentContext.Provider>
    );
}

export default CommentContext;