import React, {createContext, useState} from 'react';

export const AppContext = createContext();

function AppContextProvider({children}) {
    const [state, setState] = useState({
        unitSystem : 'metric',
    });
    function setUnitSystem(value){
        setState({
            ...state,
            unitSystem: value,
        });
    }
    return (
        <AppContext.Provider value={{
            ...state, 
            setUnitSystem,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
