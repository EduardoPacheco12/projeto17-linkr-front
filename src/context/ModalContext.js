import { createContext, useState } from "react";

const ModalContext = createContext();

export function ModalContextProvider({ children }) {
    const [ showModal, setShowModal ] = useState(false);
    const [ shareModal, setShareModal ] = useState(false);

    return(
        <ModalContext.Provider value={{ showModal, setShowModal, shareModal, setShareModal }}>
            { children }
        </ModalContext.Provider>
    );
}

export default ModalContext;