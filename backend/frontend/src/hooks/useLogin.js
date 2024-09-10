import { useAuthContext } from './useAuthContext'
import { useState } from 'react'
import { useUserContext } from './useUserContext'
export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch }= useAuthContext()
    const { User, setUser } = useUserContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            const userData = JSON.stringify(json)
            
            const response = await fetch(`/api/user/${email}`)
            const userObject = await response.json()
            if (!response.ok) {
                console.log("ERROR FETCHING USER")
            }

            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            
            //update user context
            console.log("SETTING USER CONTEXT " + userObject)
            setUser(userObject)
            console.log("USER CONTEXT SET: " + userObject)

            // update the auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }
    }

    return { login, isLoading, error }
}
