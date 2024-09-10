import { createContext, useReducer } from "react"

export const WordContext = createContext()

export const wordsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORDS': 
            return {
                words: action.payload
            }
        case 'CREATE_WORD':
            return {
                words: [action.payload, ...state.words]
            }
        case 'DELETE_WORD':
            return {
                words: state.words.filter((u) => u._id !== action.payload._id)
            }
        default: 
            return state

    }
}

export const WordContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(wordsReducer, {
        words: null
    })

    
    
    // children is <App> from index.js.
    return (
        <WordContext.Provider value={{...state, dispatch}}>
            { children }
        </WordContext.Provider>
    )

}