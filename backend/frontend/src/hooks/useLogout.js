import { useAuthContext } from "./useAuthContext"
import { useWordsContext } from "./useWordsContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: wordsDispatch} = useWordsContext()
    
    
    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type: 'LOGOUT'})
        wordsDispatch({type: 'SET_WORDS', payload: null})

    }

    return {logout}

}