import React, { useState, createContext } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const [config, setConfig] = useState({
        theme: "dark"
    })
    return (
        <AppContext.Provider value={[config, setConfig]}>
            {props.children}
        </AppContext.Provider>
    )
}