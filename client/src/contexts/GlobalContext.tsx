import React, { createContext, useReducer } from 'react';

type InitialStateType = {
    isAuthenticated: boolean | null
    uid: string | null
}

type GlobalAction = {
    type: string,
    uid?: string
}

const initialState: InitialStateType = {
    isAuthenticated: null,
    uid: null
}

const Reducer = (state: InitialStateType, action: GlobalAction): InitialStateType => {
    switch(action.type) {
        case 'LOG_IN':
            return {
                ...state,
                isAuthenticated: true,
                uid: action.uid ? action.uid : null
            }
        case 'LOG_OUT':
            return {
                ...state,
                isAuthenticated: false,
                uid: null
            }
        default:
            return state
    }
}

export const GlobalContext = createContext<{
    state: InitialStateType, 
    dispatch: React.Dispatch<GlobalAction>
}>({
    state: initialState, 
    dispatch: () => null
})

export const GlobalContextProvider = ({children}: {children: React.ReactElement}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    
    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    )
}