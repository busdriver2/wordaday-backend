import { WordContext } from "../context/WordContext"
import { useContext } from 'react'

export const useWordsContext = () => {
    const context = useContext(WordContext)

    if (!context) {
        throw Error('wordWordsContext must be used inside an WordsContextProvider')
    }


    return context
}